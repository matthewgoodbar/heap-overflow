json.questions do
    @questions.each do |question|
        json.set! question.id do
            json.extract! question, :id, :author_id, :title, :body, :created_at, :updated_at
            json.set! :author do
                json.extract! question.author, :username
            end
        end
    end
end
json.question_count Question.all.count