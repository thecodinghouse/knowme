class SkillsUser < ApplicationRecord
    validates :skill_id, uniqueness: { scope: [:user_id, ]}
end