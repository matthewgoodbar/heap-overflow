# == Schema Information
#
# Table name: votes
#
#  id         :bigint           not null, primary key
#  voter_id   :bigint           not null
#  answer_id  :bigint           not null
#  vote_type  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Vote < ApplicationRecord
    validates :voter_id, :answer_id, presence: true
    validates :answer_id, uniqueness: {scope: :voter_id}
    validates :vote_type, inclusion: {in: ["up", "down"]}

    belongs_to :voter,
        foreign_key: :voter_id,
        class_name: :User
    
    belongs_to :answer,
        foreign_key: :answer_id,
        class_name: :Answer
end
