# Heap Overflow

[Live Link](https://heapoverflow-c0ft.onrender.com)

## Background

Heap Overflow is a clone of the popular question & answer forum for developers, Stack Overflow.
This clone uses a React.js + Redux frontend, and a Ruby on Rails backend. It utilizes a
PostgreSQL database for the backend as well. It features full CRUD functionality for user-submitted
questions, answers, upvotes/downvotes, as well as search functionality for questions.

## Technologies

* JavaScript + React.js was used to render the frontend
* Redux to manage state within the frontend
* Backend with Ruby on Rails
* PostgreSQL database, interfaced using Active Record via Rails
* User authentication in the backend using BCrypt
* JSON responses from backend formatted with Jbuilder

# Feature Highlights

## Questions Page

Fetching questions to show on the questions page came with several caveats: I needed to
fetch questions based off user submitted search terms, the order the user wanted to sort the
returned quesitons, as well as the page the user is currently on. I singled out these variables
within the QuestionIndex component to be used for fetching:

### QuestionIndex.jsx
``` javascript

useEffect(() => {
    if (search) {
        setPageHeader(`Search results for "${search}"`);
        setSubtitle(" relevant question(s) found");
    } else {
        setPageHeader("All Questions");
        setSubtitle(" questions asked so far");
    }
    window.scrollTo(0,0);
    dispatch(clearQuestions());
    dispatch(fetchQuestions({ page, search, order }))
        .catch(() => {
            history.push("/404");
        });
}, [page, search, order]);

```

This useEffect dispatches this thunk action creator:

### question.js
``` javascript

export const fetchQuestions = ({ page, search, order }) => async dispatch => {
    page ||= 1;
    order ||= "NEWEST";
    let res;
    if (search) {
        res = await csrfFetch(`/api/questions/?search=${search}&page=${page}&order=${order}`);
    } else {
        res = await csrfFetch(`/api/questions/?page=${page}&order=${order}`);
    }
    const resClone = res.clone();
    if (res.ok) {
        const data = await res.json();
        dispatch(addQuestions(data.questions));
        dispatch(refreshQuestionCount(data.questionCount));
    }
    return resClone;
};

```

This request hits the index action within the questions controller in the backend, which handles
the request, filtering by search term, then by ordering, and then finally by page number. It's worth noting
that this controller also handles retrieval of questions by an 'author' query param, which uses no such
filtering and is accessed from a different fetch request than the one above.

### questions_controller.rb
``` ruby

def index
        if params[:author]
            @questions = Question.where(author_id: params[:author].to_i)
            @search_query = @questions
            if @questions
                return render :index
            else
                return render json: { errors: ["question not found"] }, status: 404
            end
        end
        
        items_per_page = 10
        page = params[:page].to_i
        search_terms = params[:search].downcase.split(" ") if params[:search]

        if params[:search]
            @search_query = []
            search_terms.each do |term|
                @search_query << Question.where("LOWER(questions.title) LIKE ?", "%#{term}%")
                    .or(Question.where("LOWER(questions.body) LIKE ?", "%#{term}%"))
            end
            @search_query = @search_query.reduce(:and)
        else
            @search_query = Question.all
        end

        order_parameter = params[:order]
        case order_parameter
        when "NEWEST"
            @order_query = @search_query.order(created_at: :desc)
        when "OLDEST"
            @order_query = @search_query.order(created_at: :asc)
        when "MOST_ANSWERED"
            @order_query = @search_query
                .left_joins(:answers)
                .group('questions.id')
                .order('COUNT(answers.id) DESC')
        when "LEAST_ANSWERED"
            @order_query = @search_query
                .left_joins(:answers)
                .group('questions.id')
                .order('COUNT(answers.id) ASC')
        else
        end

        @questions = @order_query.limit(items_per_page).offset(items_per_page * (page - 1))

        if @questions
            render :index
        else
            render json: { errors: ["question not found"] }, status: 404
        end
    end

```

Once those relevant questions have been retreived and placed in the Redux store, we have to sort them once again in
the component since the store itself is unordered. I accomplish this using a function invoked on the slice of state
returned by a useSelector call.

### QuestionIndex.jsx
``` javascript

const questions = useSelector(state => orderQuestions(Object.values(state.questions)));
    
function orderQuestions(questionArray) {
    if (questionArray) {
        switch (order) {
            case "NEWEST":
                return questionArray.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
            case "OLDEST":
                return questionArray.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
            case "MOST_ANSWERED":
                return questionArray.sort((a,b) => b.answerCount - a.answerCount);
            case "LEAST_ANSWERED":
                return questionArray.sort((a,b) => a.answerCount - b.answerCount);
        }
    }
};

```

Another issue I ran into while creating the QuestionIndex component was correctly displaying 'next' and
'prev' page buttons when necessary. I solved this with a conditional check on the 'page' and 'questionCount'
variables:

### QuestionIndex.jsx
``` javascript

<div className="page-buttons">
    { (page !== 1) &&
    <div onClick={e => setPage(num => num-1)} className="button-light">Prev</div>
    }
    { (questionCount > page * 10) &&
    <div onClick={e => setPage(num => num+1)} className="button-light">Next</div>
    }
</div>

```

## Upvotes & Downvotes

The tricky part of upvotes and downvotes was keeping track of all the states a single answer's votes could be in,
from the perspective of the user: upvoted, downvoted, not voted on at all, or disabled (if the user is logged out).
I used two event handler methods triggered by clicking the icons within the vote button GUI, each of which handle
those 4 cases and dispatch a CRUD action respectively. Here's what the handleUpvote function looks like:

### Answer.jsx
```javascript

const handleUpvote = e => {
    if (answer.votes){
        if (answer.votes[currentUser.id]?.voteType === "down") {
            dispatch(updateVote({
                id: answer.votes[currentUser.id].id,
                voteType: "up"
            }))
                .then(upvoteIcons);
        } else if (answer.votes[currentUser.id]) {
            dispatch(deleteVote(answer.votes[currentUser.id].id))
                .then(noVoteIcons);
        } else {
            dispatch(createVote({
                answerId: answer.id,
                voterId: currentUser.id,
                voteType: "up"
            }))
                .then(upvoteIcons);
        }
    } else {
        dispatch(createVote({
            answerId: answer.id,
            voterId: currentUser.id,
            voteType: "up"
        }))
            .then(upvoteIcons);
    }
};

...

<div className="vote-gui">
    { (currentUser) &&
    <img alt="upvote-button" className={`vote-button ${upvoteButtonSubclass}`} onClick={handleUpvote} />
    }
    { (!currentUser) &&
    <img alt="upvote-button" className={`vote-button ${upvoteButtonSubclass}`} />
    }
    <p>{answer.voteSum}</p>
    { (currentUser) &&
    <img alt="downvote-button" className={`vote-button ${downvoteButtonSubclass}`} onClick={handleDownvote} />
    }
    { (!currentUser) &&
    <img alt="downvote-button" className={`vote-button ${downvoteButtonSubclass}`} />
    }
</div>

```