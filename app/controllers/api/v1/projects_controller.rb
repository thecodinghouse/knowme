class Api::V1::ProjectsController < Api::V1::BaseController

    def index
      @user = User.find(params[:id])
      render json: @user.projects
    end

    def bulk_update
      h = Hash[*params["projects"].values.collect {|v| [v["id"], v.except("id")]}.flatten]
      Project.update(h.keys, h.values)
      render json: {success: true}
    end

    def create
      ed = Project.new(details_params)
      ed.save()
      respond_with ed
    end

    private

    def details_params
      params.require(:projects).permit(:title, :team_size, :description, :project_url)
    end
  end