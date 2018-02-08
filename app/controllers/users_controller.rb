class UsersController < ApplicationController
    skip_before_action :require_login, only: ['index', 'new', 'show']

    def index
        if current_user.blank?
            render component: 'Login'
        else
            redirect_to current_user.page
        end 
    end

    def show
        @user = User.find_by_uuid(params[:id])
        render component: 'Profile', props:{user: @user, profile: @user.profile}
    end

    def new
        if current_user.blank?
            render component: 'SignUp'
        else
            redirect_to current_user.page
        end 
    end

    def facebook
        render component: 'Facebook', props:{page: github_path(params[:id])}
    end

    def github
        render component: 'Github', props:{page: stackoverflow_path(params[:id])}
    end

    def stackoverflow
        render component: 'StackExchange', props:{page: user_path(params[:id])}
    end

end
