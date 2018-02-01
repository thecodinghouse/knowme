class Api::V1::ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :team_size, :description, :project_url
end
