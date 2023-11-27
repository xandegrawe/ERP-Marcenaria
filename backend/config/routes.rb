Rails.application.routes.draw do
  namespace :api do
    resources :customers, only: [:index, :show, :create, :update, :destroy]
    resources :providers, only: [:index, :show, :create, :update, :destroy]
    resources :bank_accounts, only: [:index, :show, :create, :update, :destroy]
    resources :bank_invoices, only: [:index, :show, :create, :update, :destroy]
    resources :categories, only: [:index, :show, :create]
    resources :people, only: [:index, :show]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
