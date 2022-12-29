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
end
