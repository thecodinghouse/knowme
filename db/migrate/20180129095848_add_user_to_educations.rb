class AddUserToEducations < ActiveRecord::Migration[5.0]
  def change
    add_reference :educations, :user, foreign_key: true
  end
end
