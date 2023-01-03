Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resources :questions, only: [:index, :show, :create, :update :destroy]
    resource :session, only: [:show, :create, :destroy]
  end
end
