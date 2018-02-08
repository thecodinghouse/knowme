class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :authenticate_request, only: ['index', 'github_info', 'stackoverflow_info']

  def index
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    @p = current_user.profile
    if @p.update(details_params)
      render json: {success: true}
    else
      render json: { errors: @p.errors.messages }, status: :bad_request
    end
  end

  def github
    @user = User.find(params[:id])
    sa = @user.social_accounts.where(provider: 'github').first
    if sa.blank?
      render json: []
    else
      render json: sa.meta_info
    end
    
  end

  def stackoverflow
    @user = User.find(params[:id])
    sa = @user.social_accounts.where(provider: 'stackexchange').first
    if sa.blank?
      render json: {}
    else
      render json: sa.meta_info
    end
  end

  private

  def details_params
    params.require(:profile).permit(:name, :birthday, :current_location, :hobbies, :languages,
                                    :hometown, :marital_status, :about_me, :contact_no, :title)
  end
end