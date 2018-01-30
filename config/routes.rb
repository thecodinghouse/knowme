Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'site#index'
  namespace :api do
    namespace :v1 do
      post 'login', to: 'authentication#login'
      post 'signup', to: 'authentication#signup'
      delete 'logout', to: 'authentication#logout'
    end
  end

  get "/auth/:provider/callback", to: "sessions#create"
  get 'auth/failure', to: redirect('/')

  resources :users
end
