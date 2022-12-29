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
end
