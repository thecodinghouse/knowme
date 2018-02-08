class Api::V1::ProfileSerializer < ActiveModel::Serializer
  attributes :id, :title, :name, :birthday, :current_location, :hometown, :hobbies, :languages, :marital_status,
             :about_me, :contact_no, :image_url
  belongs_to :user
end