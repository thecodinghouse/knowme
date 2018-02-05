class Api::V1::EducationsController < Api::V1::BaseController
  skip_before_action :authenticate_request, only: ['index']

  def index
    @user = User.find(params[:id])
    render json: @user.educations
  end

  def bulk_update
    h = Hash[ *params["educations"].values.collect { |v| [ v["id"], v.except("id") ] }.flatten ]
    current_user.educations.update(h.keys, h.values)
    render json: { success: true }
  end

  def update
    @ed = current_user.educations.find(params[:id])
    if @ed.update(details_params)
      render json: @ed
    else
      render json: { errors: @ed.errors.messages }, status: :bad_request
    end
  end

  def create
    @ed = current_user.educations.new(details_params)
    if @ed.save
      render json: @ed
    else
      render json: { errors: @ed.errors.messages }, status: :bad_request
    end
  end

  def destroy
    @ed =current_user.educations.find(params[:id])
    if @ed.destroy
      render json: {success: true}
    else
      render json: {success: false}
    end
  end

  private

  def details_params
    params.require(:education).permit(:institution, :year_of_start, :year_of_end, :degree, :field_of_study)
  end
end
