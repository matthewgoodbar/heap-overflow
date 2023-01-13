json.user do
    json.extract! @user, :id, :email, :username, :created_at, :updated_at
    json.karma @user.karma
    json.question_count @user.questions.count
    json.answer_count @user.answers.count
    json.vote_count @user.votes.count
end