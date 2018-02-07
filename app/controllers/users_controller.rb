class UsersController < ApplicationController
    skip_before_action :require_login, only: ['index', 'new', 'show']

    def index
        render component: 'Login'
    end

    def show
        @user = User.find_by_uuid(params[:id])
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

end
