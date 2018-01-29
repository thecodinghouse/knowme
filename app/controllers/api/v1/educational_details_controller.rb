class Api::V1::EducationalDetailsController < Api::V1::BaseController

  def index
    @user = User.find(params[:id])
    respond_with @user.educational_details
  end

  def update
    ed = EducationalDetail.find(params[id])
    ed.update(details_params)
    respond_with ed
  end

  def create
    ed = EducationalDetail.new(details_params)
    ed.save()
    respond_with ed
  end

  private

  def details_params
    params.require(:educational_detail).permit(:year_of_start)
  end
end
