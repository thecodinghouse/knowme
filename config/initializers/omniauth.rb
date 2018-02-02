Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, Rails.application.secrets.github_client_id, Rails.application.secrets.github_client_secret, { scope: 'user:email' }

  provider :facebook, Rails.application.secrets.facebook_client_id, Rails.application.secrets.facebook_client_secret, scope: 'email,user_about_me,user_birthday,user_education_history,user_hometown,user_work_history,user_location'

  # provider :stackexchange, Rails.application.secrets.stackexchange_client_id, Rails.application.secrets.stackexchange_client_secret, Rails.application.secrets.stackexchange_public_key, site: 'stackoverflow'
end