class Api::V1::UserSerializer < ActiveModel::Serializer
  attributes :id, :email
  has_one :profile
end