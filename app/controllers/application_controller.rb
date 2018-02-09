class ApplicationController < ActionController::Base 
    helper_method :current_user
    before_action :require_login

    def current_user
      return unless session[:user_id]
      @current_user ||= User.find(session[:user_id])
    end

    private

    def require_login
      unless current_user
        flash[:danger] = "You must be logged in to access this section"
        redirect_to  main_app.users_path # halts request cycle
      end
    end
end
