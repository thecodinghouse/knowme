class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :title
      t.integer :team_size
      t.string :description
      t.text :project_url

      t.timestamps
    end
  end
end
