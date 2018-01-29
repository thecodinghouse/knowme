class AddUserToEducationalDetails < ActiveRecord::Migration[5.0]
  def change
    add_reference :educational_details, :user, foreign_key: true
  end
end
