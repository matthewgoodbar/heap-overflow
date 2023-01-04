json.questions do
    @questions.each do |question|
        json.set! question.id do
            json.extract! question, :id, :author_id, :title, :body, :created_at, :updated_at
        end
    end
end