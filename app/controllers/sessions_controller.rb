class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:facebook]

  def facebook
    auth = env["omniauth.auth"]
    showMsg = false
    user = User.find_by_email(auth.info.email)
    if user.blank?
        user = User.create!(email: auth.info.email , password: 'password123' , password_confirmation: 'password123')
        Profile.create!(name: auth.info.name , user: user, image_url: auth.info.image)
        showMsg = true
    end
  
    account = User.from_omniauth(auth, user)

    if account.user.valid? 
      flash[:info] = "Your password is 'password123' we recommend you to reset it." if showMsg
      session[:user_id] = account.user.id
      flash[:auth_token] = "#{account.user.auth_token}"
      flash.keep(:auth_token)
      redirect_to account.user.page
    end
  end

  def github
    auth = env["omniauth.auth"]
    account = User.from_omniauth(auth, current_user)
    if account.user.valid? 
      redirect_to account.user.page
    end
  end

  def stackexchange
    auth = env["omniauth.auth"]
    account = User.from_omniauth(auth, current_user)
    if account.user.valid? 
      redirect_to account.user.page
    end
  end

end
