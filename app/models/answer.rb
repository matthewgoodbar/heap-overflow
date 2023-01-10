# == Schema Information
#
# Table name: answers
#
#  id          :bigint           not null, primary key
#  author_id   :bigint           not null
#  question_id :bigint           not null
#  body        :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Answer < ApplicationRecord
    validates :author_id, :question_id, :body, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
    
    belongs_to :question,
        foreign_key: :question_id,
        class_name: :Question
    
    has_many :votes,
        foreign_key: :answer_id,
        class_name: :Vote
    
    def vote_sum
        up_votes = self.votes.where(vote_type: "up").count
        down_votes = self.votes.where(vote_type: "down").count * -1
        return up_votes + down_votes
    end
end
