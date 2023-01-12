# == Schema Information
#
# Table name: questions
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  title      :string           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Question < ApplicationRecord
    validates :author_id, :body, presence: true
    validates :title, uniqueness: true, length: {in: 3..100}

    has_many :answers,
        foreign_key: :question_id,
        class_name: :Answer,
        dependent: :destroy
    
    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    def answer_count
        return self.answers.count
    end
end
