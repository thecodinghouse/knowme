class Skill < ApplicationRecord
  has_and_belongs_to_many :users, through: :skills_users
  validates :name, presence: true, uniqueness: true


  def self.to_options(skills)
    all_skills = []
    skills.map(&:name).uniq.each do |s|
      skill = Hash.new
      skill['text'] = s
      skill['value'] = s
      all_skills << skill
    end
    return all_skills
  end
end
