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
        @providers = current_user.social_accounts.map(&:provider)
        isEditMode = false
        if current_user && current_user == @user
            isEditMode = true
        end
        default_user_path = ActionController::Base.helpers.asset_url("defaultpic.jpg")
        render component: 'Profile', props:{user_id: @user.id, isEditMode: isEditMode, defaultPic: default_user_path,
                                            providers: @providers}
    end

    def new
        if current_user.blank?
            render component: 'SignUp'
        else
            redirect_to current_user.page
        end 
    end

    def facebook
        if current_user.social_accounts.map(&:provider).include?('facebook')
            redirect_to stackoverflow_path(current_user.uuid)
        else
            render component: 'Facebook', props:{page: stackoverflow_path(current_user.uuid)}
        end
       
    end

    def github
        if current_user.social_accounts.map(&:provider).include?('github')
            redirect_to facebook_path(params[:id])
        else
            render component: 'Github', props:{page: facebook_path(current_user.uuid)}
        end
    end

    def stackoverflow
        if current_user.social_accounts.map(&:provider).include?('stackexchange')
            redirect_to profile_path(current_user.uuid)
        else
            render component: 'StackExchange', props:{page: profile_path(current_user.uuid)}
        end
    end

end
