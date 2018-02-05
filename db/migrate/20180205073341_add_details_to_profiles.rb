class AddDetailsToProfiles < ActiveRecord::Migration[5.0]
  def change
    add_column :profiles, :current_location, :string
    add_column :profiles, :hobby, :string
    add_column :profiles, :languages_known, :string
    add_column :profiles, :hometown, :string
    add_column :profiles, :marital_status, :string
    add_column :profiles, :about_me, :string
    add_column :profiles, :contact_no, :integer
  end
end
