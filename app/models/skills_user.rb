class SkillsUser < ApplicationRecord
    validates_uniqueness_of :skill_id,  scope: [:user_id]
end