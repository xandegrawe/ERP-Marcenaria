# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    resources :customers, only: %i[index show create update destroy]
    resources :providers, only: %i[index show create update destroy]
    resources :bank_accounts, only: %i[index show create update destroy]

    resources :bank_invoices, only: %i[index show create update destroy] do
      member do
        get 'calculate_summary' => 'bank_invoices#calculate_summary'
      end
    end

    resources :categories, only: %i[index show create]
    resources :people, only: %i[index show]
  end

  # root "articles#index"
end
