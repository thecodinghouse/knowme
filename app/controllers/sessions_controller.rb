class SessionsController < ApplicationController
  skip_before_action :require_login 

  def create
    showMsg = User.find_by_email(env["omniauth.auth"]["info"]["email"])
    account = User.from_omniauth(env["omniauth.auth"])

    if account.user.valid?
      session[:user_id] = account.user.id
      flash[:info] = "Your password is your (username of #{account.provider}) for now." if showMsg.blank?
      redirect_to root_path
    end
  end
end
