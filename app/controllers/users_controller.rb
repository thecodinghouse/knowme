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
        className = "public_view"
        if current_user && current_user == @user
            className = ""
        end
        default_user_path = ActionController::Base.helpers.asset_url("defaultpic.jpg")
        render component: 'Profile', props:{user: @user, profile: @user.profile, view: className, defaultPic: default_user_path}
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
        render component: 'StackExchange', props:{page: profile_path(params[:id])}
    end

end
