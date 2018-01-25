class CreateUserDetails < ActiveRecord::Migration[5.0]
  def change
    create_table :user_details do |t|
      t.string :name
      t.date :dob
      t.references :user, index: { unique: true }
      
      t.timestamps
    end
  end
end
