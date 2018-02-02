class Api::V1::EducationSerializer < ActiveModel::Serializer
  attributes :id, :institution, :year_of_start, :year_of_end, :degree, :field_of_study
end
