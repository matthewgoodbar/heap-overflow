json.answer do
    json.extract! @answer, :id, :body, :author_id, :question_id, :created_at, :updated_at
    json.author do
        json.extract! @answer.author, :username
    end
end