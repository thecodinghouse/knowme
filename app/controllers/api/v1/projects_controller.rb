class Api::V1::ProjectsController < Api::V1::BaseController
    skip_before_action :authenticate_request, only: ['index']

    def index
      @user = User.find(params[:id])
      render json: @user.projects
    end

    def bulk_update
      h = Hash[*params["projects"].values.collect {|v| [v["id"], v.except("id")]}.flatten]
      Project.update(h.keys, h.values)
      render json: {success: true}
    end

    def update
      @p = Project.find(params[:id])
      if @p.update(details_params)
        render json: @p
      else
        render json: { errors: @p.errors.messages }, status: :bad_request
      end
    end

    def create
      @p = Project.new(details_params)
      @p.user = current_user
      if @p.save
        render json: @p
      else
        render json: { errors: @p.errors.messages }, status: :bad_request
      end
    end

    private

    def details_params
      params.require(:project).permit(:title, :team_size, :description, :project_url)
    end
  end