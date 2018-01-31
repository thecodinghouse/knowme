class Api::V1::EducationalDetailSerializer < ActiveModel::Serializer
  attributes :id, :year_of_start, :year_of_end, :degree, :field_of_study
end
