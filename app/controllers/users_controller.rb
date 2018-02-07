class UsersController < ApplicationController
    skip_before_action :require_login, only: ['index', 'new', 'show']

    def index
        if current_user.blank?
            render component: 'Login'
        else
            @user = User.find_by_uuid(current_user.uuid)
            render component: 'Profile', props:{user: current_user, profile: current_user.profile}
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
            @user = User.find_by_uuid(current_user.uuid)
            render component: 'Profile', props:{user: current_user, profile: current_user.profile}
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
