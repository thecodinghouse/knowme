class Api::V1::EducationalDetailsController < Api::V1::BaseController

  def index
    @user = User.find(params[:id])
    render json: @user.educational_details
  end

  def bulk_update
    h = Hash[ *params["educational_details"].values.collect { |v| [ v["id"], v.except("id") ] }.flatten ]
    EducationalDetail.update(h.keys, h.values)
    render json: { success: true }
  end

  def create
    ed = EducationalDetail.new(details_params)
    ed.save()
    respond_with ed
  end

  private

  def details_params
    params.require(:educational_detail).permit(:year_of_start, :year_of_end, :degree, :field_of_study)
  end
end
