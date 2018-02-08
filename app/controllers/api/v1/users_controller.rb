class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :authenticate_request, only: ['index', 'serve', 'github_info', 'stackoverflow_info']

  def create
    @photo = Photo.new
    @photo.data      = params[:image].read
    @photo.file_name  = params[:image].original_filename
    @photo.content_type = params[:image].content_type
    @photo.user = current_user
    if @photo.save
      image_path = api_v1_serve_photo_path(current_user.id)
      current_user.profile.image_url = api_v1_serve_photo_path(current_user.id)
      current_user.profile.save!
      render json: {success: true, image_path: image_path}
    else
      render json: { errors: @use.errors.messages }, status: :bad_request
    end
  end

  def serve
    @user = User.find(params[:id])
    send_data(@user.photo.data, :type => @user.photo.content_type, :filename => "#{@user.photo.file_name}", :disposition => "inline")
  end

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