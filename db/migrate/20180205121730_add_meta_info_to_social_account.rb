class AddMetaInfoToSocialAccount < ActiveRecord::Migration[5.0]
  def change
    add_column :social_accounts, :meta_info, :jsonb, default: {} 
  end
end
