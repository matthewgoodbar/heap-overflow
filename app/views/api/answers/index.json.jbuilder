json.answers do
    @answers.each do |answer|
        json.set! answer.id do
            json.extract! answer, :id, :author_id, :question_id, :body, :created_at, :updated_at
            json.author do
                json.extract! answer.author, :username
            end
        end
    end
end