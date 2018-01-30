class AddUserToExperienceDetails < ActiveRecord::Migration[5.0]
  def change
    add_reference :experience_details, :user, foreign_key: true
  end
end
