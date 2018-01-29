class UsersController < ApplicationController

    def index
    end    

    def update
    end

    def show
        @user = User.find(params[:id])
        @e_detail = @user.educational_details
        render component: 'Profile', props:{user: @user, e_detail:@e_detail}
    end

    def create
        @user = User.create!(user_params)
        UserDetail.create!(user: @user)
        redirect_to @user
    end

    def new
        render component: 'SignUp'
    end

    private

    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
