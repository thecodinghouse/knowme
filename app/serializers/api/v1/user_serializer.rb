class Api::V1::UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :uuid
  has_one :profile
end