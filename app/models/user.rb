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

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        if user&.is_password?(password)
            return user
        else
            return nil
        end
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        bcrypt_object = BCrypt::Password.new(self.password_digest)
        bcrypt_object.is_password?(password)
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
