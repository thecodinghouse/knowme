class Api::V1::AuthenticationController < Api::V1::BaseController 
    skip_before_action :authenticate_request
    
    def login 
        command = AuthenticateUser.call(params[:email], params[:password]) 
        if command.success? 
            session[:auth_token] = command.result.auth_token
            render json: { auth_token: command.result.auth_token, detail_page: user_path(command.result.id) } 
        else 
            render json: { errors: command.errors }, status: :unauthorized 
        end 
    end  

    def signup
        @user = User.new(user_params)
        if @user.save
            UserDetail.create!(user: @user)
            session[:auth_token] = @user.auth_token
            render json: { auth_token: @user.auth_token, detail_page: user_path(@user.id)} 
        else
            render json: { errors: @user.errors.messages }, status: :bad_request
        end
    end
    
    def logout
        user = User.find_by_auth_token(params['auth_token'])
        user.regenerate_auth_token if user
        session.delete('auth_token')
        if request.xhr?
            render json: { success: true }
        else
            redirect_to root_path
        end
    end 

    private 

    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end