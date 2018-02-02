class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles do |t|
      t.string :name
      t.date :birthday
      t.string :image_url
      t.references :user, index: { unique: true }
      
      t.timestamps
    end
  end
end
