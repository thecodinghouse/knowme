Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'site#index'
  namespace :api do
    namespace :v1 do
      post 'login', to: 'authentication#login'
      post 'signup', to: 'authentication#signup'
      delete 'logout', to: 'authentication#logout'
      resources :educations, only: ['create', 'index', 'update', 'destroy']
      resources :works, only: ['create', 'index', 'update', 'destroy']
      patch 'educations_update', to: 'educations#bulk_update'
      patch 'works_update', to: 'works#bulk_update'
      resources :skills, only: ['create', 'index', 'destroy']
      resources :achievements, only: ['create', 'update', 'index', 'destroy']
      patch 'achievements_update', to: 'achievements#bulk_update'
      resources :projects, only: ['create', 'update', 'index', 'destroy']
      patch 'projects_update', to: 'projects#bulk_update'
      resources :users, only: ['index', 'update', 'create']
      get "users/github", to: "users#github", as: :github
      get "users/stackoverflow", to: "users#stackoverflow", as: :stackoverflow
      get "users/:id/serve", to: 'users#serve', as: :serve_photo
    end
  end

  get "/auth/facebook/callback", to: "sessions#facebook"
  get "/auth/github/callback", to: "sessions#github"
  get "/auth/stackexchange/callback", to: "sessions#stackexchange"
  get 'auth/failure', to: redirect('/')

  resources :users, only: ['index', 'show', 'new']
  get "users/:id/github", to: "users#github", as: :github
  get "users/:id/stackoverflow", to: "users#stackoverflow", as: :stackoverflow
  get "users/:id/facebook", to: "users#facebook", as: :facebook
end
