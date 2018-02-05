Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'site#index'
  namespace :api do
    namespace :v1 do
      post 'login', to: 'authentication#login'
      post 'signup', to: 'authentication#signup'
      delete 'logout', to: 'authentication#logout'
      resources :educations, :only =>['create', 'index', 'update', 'delete']
      resources :works, :only =>['create', 'index', 'update', 'delete']
      patch 'educations_update', to: 'educations#bulk_update'
      patch 'works_update', to: 'works#bulk_update'
      resources :skills, :only =>['create', 'index', 'delete']
      resources :achievements, :only =>['create', 'update', 'index', 'delete']
      patch 'achievements_update', to: 'achievements#bulk_update'
      resources :projects, :only =>['create', 'update', 'index', 'delete']
      patch 'projects_update', to: 'projects#bulk_update'
    end
  end

  get "/auth/facebook/callback", to: "sessions#facebook"
  get "/auth/github/callback", to: "sessions#github"
  get "/auth/stackexchange/callback", to: "sessions#stackexchange"
  get 'auth/failure', to: redirect('/')

  resources :users
  get "users/:id/github", to: "users#github", as: :github
  get "users/:id/stackoverflow", to: "users#stackoverflow", as: :stackoverflow
end
