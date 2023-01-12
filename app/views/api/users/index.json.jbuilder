json.users do
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :email, :username, :created_at, :updated_at
            json.karma user.karma
            json.question_count user.questions.count
            json.answer_count user.answers.count
            json.vote_count user.votes.count
        end
    end
end
json.user_count @search_query.count