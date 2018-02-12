class CreatePhotos < ActiveRecord::Migration[5.0]
  def change
    create_table :photos do |t|
      t.binary :data, limit: 2.megabytes
      t.string :file_name
      t.string :content_type
      t.references :user, foreign_key: true 
      
      t.timestamps
    end
  end
end
