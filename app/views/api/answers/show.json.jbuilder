json.answer do
    json.extract! @answer, :id, :body, :author_id, :question_id, :created_at, :updated_at
    json.vote_sum @answer.vote_sum
    json.votes do
        @answer.votes.each do |vote|
            json.set! vote.voter_id do
                json.extract! vote, :id, :voter_id, :vote_type
            end
        end
    end
    json.author do
        json.extract! @answer.author, :username
    end
end