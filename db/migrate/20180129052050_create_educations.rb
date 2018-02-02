class CreateEducations < ActiveRecord::Migration[5.0]
  def change
    create_table :educations do |t|
      t.string :institution
      t.date :year_of_start
      t.date :year_of_end
      t.string :degree
      t.string :field_of_study

      t.timestamps
    end
  end
end
