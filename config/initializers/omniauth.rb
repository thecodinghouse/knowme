Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, Rails.application.secrets.github_client_id, Rails.application.secrets.github_client_secret, scope: 'user,repo,gist'

  provider :facebook, Rails.application.secrets.facebook_client_id, Rails.application.secrets.facebook_client_secret, scope: 'email,public_profile,user_birthday,user_hometown,user_location'

  provider :stackexchange, Rails.application.secrets.stackexchange_client_id, Rails.application.secrets.stackexchange_client_secret, public_key: Rails.application.secrets.stackexchange_public_key, site: 'stackoverflow'
end