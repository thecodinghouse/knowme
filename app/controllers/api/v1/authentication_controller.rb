class AuthenticationController < Api::V1::BaseController 
    skip_before_action :authenticate_request 
    
    def login 
        command = AuthenticateUser.call(params[:email], params[:password]) 
        if command.success? 
            render json: { auth_token: command.result } 
        else 
            render json: { error: command.errors }, status: :unauthorized 
        end 
    end  

    def signup
        user = User.create!(params)
        UserDetail.create!(user: user)
        respond_with user
    end    
end