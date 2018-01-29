class UsersController < ApplicationController
    skip_before_action :require_login, only: ['index', 'new']

    def index
        render component: 'Login'
    end

    def update

    end

    def show
        @user = User.find(params[:id])
        @e_detail = @user.educational_details
        render component: 'Profile', props:{user: @user, e_detail:@e_detail}
    end

    def new
        render component: 'SignUp'
    end
end
