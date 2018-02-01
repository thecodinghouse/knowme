class Skill < ApplicationRecord
  has_and_belongs_to_many :users, through: :skills_users
  validates :skill_name, presence: true, uniqueness: true
end
