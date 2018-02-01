class Api::V1::SkillsController < Api::V1::BaseController
  def index
    @user = User.find(params[:id])
    respond_with @user.skills
  end

  def update
    ed = Skill.find(params[id])
    ed.update(details_params)
    respond_with ed
  end

  def create
    ed = Skill.new(details_params)
    ed.save()
    respond_with ed
  end

  private

  def details_params
    params.require(:skill).permit(:skill_name)
  end


end
