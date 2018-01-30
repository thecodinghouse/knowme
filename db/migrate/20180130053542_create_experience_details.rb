class CreateExperienceDetails < ActiveRecord::Migration[5.0]
  def change
    create_table :experience_details do |t|
      t.string :company_name
      t.date :year_of_start
      t.date :year_of_end
      t.string :designation
      t.string :location
      t.boolean :currently_working

      t.timestamps
    end
  end
end
