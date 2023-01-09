json.answers do
    @answers.each do |answer|
        json.extract! answer, :author_id, :question_id, :body, :created_at, :updated_at
    end
end