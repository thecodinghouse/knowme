class User < ApplicationRecord
    has_secure_password
    has_one :user_detail
    validates :email, presence: true, uniqueness: true
end
