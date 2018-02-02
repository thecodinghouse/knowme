class AddUserToWorks < ActiveRecord::Migration[5.0]
  def change
    add_reference :works, :user, foreign_key: true
  end
end
