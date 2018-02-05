class AddEducationtypeToEducations < ActiveRecord::Migration[5.0]
  def change
    add_column :educations, :education_type, :string
  end
end
