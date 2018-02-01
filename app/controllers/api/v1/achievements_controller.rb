class Api::V1::AchievementsController < Api::V1::BaseController

  def index
    @user = User.find(params[:id])
    render json: @user.achievements
  end

  def bulk_update
    h = Hash[*params["achievements"].values.collect {|v| [v["id"], v.except("id")]}.flatten]
    Achievement.update(h.keys, h.values)
    render json: {success: true}
  end

  def create
    ed = Achievement.new(details_params)
    ed.save()
    respond_with ed
  end

  private

  def details_params
    params.require(:achievements).permit(:year_issued, :description, :title)
  end

end
