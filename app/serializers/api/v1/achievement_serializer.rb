class Api::V1::AchievementSerializer < ActiveModel::Serializer
  attributes :id, :year_issued, :title, :description
end
