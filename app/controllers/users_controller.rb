class UsersController < ApplicationController
    skip_before_action :require_login, only: ['index', 'new']

    def index
        render component: 'Login'
    end

    def update
        @p = current_user.profile
        if @p.update(details_params)
            render json: @p
        else
            render json: { errors: @p.errors.messages }, status: :bad_request
        end
    end

    def show
        @user = User.find(params[:id])
        render component: 'Profile', props:{user: @user, profile: @user.profile}
    end

    def new
        render component: 'SignUp'
    end

    def github
        render component: 'Github', props:{page: stackoverflow_path(params[:id])}
    end

    def stackoverflow
        render component: 'StackExchange', props:{page: user_path(params[:id])}
    end

    private

    def details_params
        params.require(:profile).permit(:name, :birthday, :current_location, :hobbies, :languages,
                                        :hometown, :marital_status, :about_me, :contact_no)
    end

end
