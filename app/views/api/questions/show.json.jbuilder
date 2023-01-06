json.question do
    json.extract! @question, :id, :author_id, :title, :body, :created_at, :updated_at
    json.author do
        json.extract! @question.author, :username
    end
end