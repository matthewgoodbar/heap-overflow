json.questions do
    @questions.each do |question|
        json.set! question.id do
            json.extract! question, :id, :author_id, :title, :body, :created_at, :updated_at
            json.author do
                json.extract! question.author, :username
            end
            json.answer_count question.answers.count
        end
    end
end
json.question_count @search_query.count