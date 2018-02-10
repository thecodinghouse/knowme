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
        isEditMode = false
        if current_user && current_user == @user
            isEditMode = true
        end
        default_user_path = ActionController::Base.helpers.asset_url("defaultpic.jpg")
        render component: 'Profile', props:{user_id: @user.id, isEditMode: isEditMode, defaultPic: default_user_path}
    end

    def new
        if current_user.blank?
            render component: 'SignUp'
        else
            redirect_to current_user.page
        end 
    end

    def facebook
        render component: 'Facebook', props:{page: stackoverflow_path(params[:id])}
    end

    def github
        render component: 'Github', props:{page: facebook_path(params[:id])}
    end

    def stackoverflow
        render component: 'StackExchange', props:{page: profile_path(params[:id])}
    end

end
