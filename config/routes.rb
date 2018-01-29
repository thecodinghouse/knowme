Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'site#index'
  namespace :api do
    namespace :v1 do
      post 'login', to: 'authentication#login'
      post 'signup', to: 'authentication#signup'
      get 'logout', to: 'authentication#logout'
      resources :educational_details, :only =>['create', 'update', 'index']
    end
  end

  resources :users
end
