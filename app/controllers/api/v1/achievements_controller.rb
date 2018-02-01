class Api::V1::AchievementsController < Api::V1::BaseController
  skip_before_action :authenticate_request, only: ['index']

  def index
    @user = User.find(params[:id])
    render json: @user.achievements
  end

  def bulk_update
    h = Hash[*params["achievements"].values.collect {|v| [v["id"], v.except("id")]}.flatten]
    Achievement.update(h.keys, h.values)
    render json: {success: true}
  end

  def update
    @a = Achievement.find(params[:id])
    if @a.update(details_params)
      render json: @a
    else
      render json: { errors: @a.errors.messages }, status: :bad_request
    end
  end

  def create
    @a = Achievement.new(details_params)
    @a.user = current_user
    if @a.save
      render json: @a
    else
      render json: { errors: @a.errors.messages }, status: :bad_request
    end
  end

  private

  def details_params
    params.require(:achievement).permit(:year_issued, :description, :title)
  end

end
