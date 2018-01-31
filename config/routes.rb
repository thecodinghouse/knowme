Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'site#index'
  namespace :api do
    namespace :v1 do
      post 'login', to: 'authentication#login'
      post 'signup', to: 'authentication#signup'
      delete 'logout', to: 'authentication#logout'
      resources :educational_details, :only =>['create', 'index']
      resources :experience_details, :only =>['create', 'index']
      patch 'education_update', to: 'educational_details#bulk_update'
      patch 'experience_update', to: 'experience_details#bulk_update'
      resources :skills, :only =>['create', 'update', 'index']
      resources :achievements, :only =>['create', 'update', 'index']
      patch 'achievement_update', to: 'achievements#bulk_update'
      resources :projects, :only =>['create', 'update', 'index']
      patch 'project_update', to: 'projects#bulk_update'


    end
  end

  get "/auth/:provider/callback", to: "sessions#create"
  get 'auth/failure', to: redirect('/')

  resources :users
end
