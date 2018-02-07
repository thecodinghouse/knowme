class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :authenticate_request, only: ['index']

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

  private

  def details_params
    params.require(:profile).permit(:name, :birthday, :current_location, :hobbies, :languages,
                                    :hometown, :marital_status, :about_me, :contact_no, :title)
  end
end