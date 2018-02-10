class Api::V1::SkillsController < Api::V1::BaseController
  skip_before_action :authenticate_request, only: ['index']
  
  def index
    @user = User.find(params[:id])
    render json: @user.skills.uniq
  end
  
  def create
    skills = details_params["name"].split(',')
    skills.each do |s|
      @skill = Skill.find_or_create_by(name: s)
      current_user.skills << @skill
    end
    render json: current_user.skills
  end

  def destroy
    @s = Skill.find(params[:id])
    current_user.skills.delete(@s)
    render json: {success: true}
  end

  def search
    @skills = Skill.where("name LIKE :prefix", prefix: "#{params['q']}%")
    render json: Skill.to_options(@skills)
  end

  private

  def details_params
    params.require(:skill).permit(:name)
  end

end
