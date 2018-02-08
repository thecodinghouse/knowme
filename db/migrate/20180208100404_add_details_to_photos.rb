class AddDetailsToPhotos < ActiveRecord::Migration[5.0]
  def change
    add_column :photos, :data, :binary
    add_column :photos, :file_name, :string
    add_column :photos, :content_type, :string
    add_reference :photos, :user, foreign_key: true
  end
end
