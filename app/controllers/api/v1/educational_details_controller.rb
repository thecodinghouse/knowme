class Api::V1::EducationalDetailsController < Api::V1::BaseController
  skip_before_action :authenticate_request, only: ['index']

  def index
    @user = User.find(params[:id])
    render json: @user.educational_details
  end

  def bulk_update
    h = Hash[ *params["educational_details"].values.collect { |v| [ v["id"], v.except("id") ] }.flatten ]
    EducationalDetail.update(h.keys, h.values)
    render json: { success: true }
  end

  def update
    @ed = EducationalDetail.find(params[:id])
    if @ed.update(details_params)
      render json: @ed
    else
      render json: { errors: @ed.errors.messages }, status: :bad_request
    end
  end

  def create
    @ed = EducationalDetail.new(details_params)
    @ed.user = current_user
    if @ed.save
      render json: @ed
    else
      render json: { errors: @ed.errors.messages }, status: :bad_request
    end
  end

  private

  def details_params
    params.require(:educational_detail).permit(:year_of_start, :year_of_end, :degree, :field_of_study)
  end
end
