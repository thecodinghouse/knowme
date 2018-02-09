class AddTimestampsToSkillsUser < ActiveRecord::Migration[5.0]
  def change
    add_timestamps :skills_users, default: DateTime.now
    change_column_default :skills_users, :created_at, nil
    change_column_default :skills_users, :updated_at, nil
  end
end
