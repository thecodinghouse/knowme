class EducationalDetailsController < BaseController

  def index
    respond_with EducationalDetail.all
    render component: 'EducationalDetail'
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
