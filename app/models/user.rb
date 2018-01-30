class User < ApplicationRecord
    has_secure_password
    has_secure_token :auth_token
    has_one :user_detail
    validates :email, presence: true, uniqueness: true
    has_many :educational_details
    has_many :experience_details
    has_and_belongs_to_many :skills
end
