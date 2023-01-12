# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    attr_reader :password
    validates :username, 
        uniqueness: true, 
        length: { in: 3..30 }, 
        format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :email, 
        uniqueness: true, 
        length: { in: 3..255 }, 
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true

    before_validation :ensure_session_token

    has_secure_password

    has_many :questions,
        foreign_key: :author_id,
        class_name: :Question,
        dependent: :destroy
    
    has_many :answers,
        foreign_key: :author_id,
        class_name: :Answer,
        dependent: :destroy
    
    has_many :votes,
        foreign_key: :voter_id,
        class_name: :Vote,
        dependent: :destroy
    
    has_many :votes_from_others,
        through: :answers,
        source: :votes
    
    has_many :voted_answers,
        through: :votes,
        source: :answer

    def karma
        return self.votes_from_others.where(vote_type: "up").count
    end

    def self.find_by_credentials(credential, password)
        if (URI::MailTo::EMAIL_REGEXP.match(credential))
            user = User.find_by(email: credential)
        else
            user = User.find_by(username: credential)
        end

        if user&.authenticate(password)
            return user
        else
            return nil
        end
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    private
    def generate_unique_session_token
        token = SecureRandom::urlsafe_base64
        while User.exists?(session_token: token)
            token = SecureRandom::urlsafe_base64
        end
        token
    end
end
