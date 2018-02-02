class Api::V1::SkillsController < Api::V1::BaseController
  skip_before_action :authenticate_request, only: ['index']
  
  def index
    @user = User.find(params[:id])
    render json: @user.skills.uniq
  end
  
  def create
    @s = Skill.find_by_name(details_params["name"])
    if @s.blank?
      @s = Skill.new(details_params)
      @s.save()
    end
    current_user.skills << @s
    render json: @s
  end

  def delete
    @s = Skill.find(params[:id])
    current_user.skills.delete(@s)
    render json: {success: true}
  end

  private

  def details_params
    params.require(:skill).permit(:name)
  end

end
