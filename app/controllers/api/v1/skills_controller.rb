class Api::V1::SkillsController < Api::V1::BaseController
  skip_before_action :authenticate_request, only: ['index']
  
  def index
    @user = User.find(params[:id])
    all_skills = []
    Skill.all.map(&:name).uniq.each do |s|
      skill = Hash.new
      skill['text'] = s
      skill['value'] = s
      all_skills << skill
    end
    
    render json: {user_skills: @user.skills.uniq, all_skills: all_skills}
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

  private

  def details_params
    params.require(:skill).permit(:name)
  end

end
