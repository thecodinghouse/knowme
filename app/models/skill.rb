class Skill < ApplicationRecord
  has_and_belongs_to_many :users, through: :skills_users
  validates :name, presence: true, uniqueness: true
end
