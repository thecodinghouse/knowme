class CreateSkillsAndUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :skills_and_users do |t|
      t.references :user, index: true
      t.references :skill, index: true
    end
  end
end
