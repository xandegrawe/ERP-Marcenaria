class Api::ProvidersController < ApplicationController
  def index
    providers = Provider.includes(:person).all
    provider_data = providers.map do |provider|
      {
        id: provider.id,
        cnpj: provider.cnpj,
        name: provider.person.name,
        phone: provider.person.phone
      }
    end
    render json: provider_data
  end

  def create
    customer = Provider.create!(customer_params)
    render json: customer
  end

  def show
    customer = Provider.find(params[:id])
    render json: customer
  end

  def update
    customer = Provider.find(params[:id])
    customer.update!(customer_params)
    render json: customer
  end
end
