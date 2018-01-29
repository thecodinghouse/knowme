class ApplicationController < ActionController::Base 
    helper_method :current_user
    before_action :require_login

    def current_user
      return unless session[:auth_token]
      @current_user ||= User.find_by_auth_token(session[:auth_token])
    end

    private

    def require_login
      unless current_user
        flash[:error] = "You must be logged in to access this section"
        redirect_to users_path # halts request cycle
      end
    end
end
