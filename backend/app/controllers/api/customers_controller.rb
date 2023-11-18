class Api::CustomersController < ApplicationController
  def index
    customers = Customer.includes(:person).all
    customer_data = customers.map do |customer|
      {
        id: customer.id,
        name: customer.person.name,
        last_name: customer.last_name,
        phone: customer.person.phone
      }
    end
  
    render json: customer_data
  end

  def create
    ActiveRecord::Base.transaction do
      person = Person.create!(person_params)
      address = Address.new(address_params.merge(person_id: person.id))
      address.save!
      
      customer = Customer.new(customer_params.merge(person_id: person.id))
      customer.save!
  
      render json: { person: person, address: address, customer: customer }, status: :created
    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: "Falha na criação: #{e.message}" }, status: :unprocessable_entity
    end
  end

  def show
    customer, person, address = select_customer
    render json: { customer: customer, address: address, person: person }
  end

  def update
    customer, person, address = select_customer

    ActiveRecord::Base.transaction do
      person.update!(person_params)
      address.update!(address_params)
      customer.update!(customer_params)
    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: "Falha na atualização: #{e.message}" }, status: :unprocessable_entity
    end
    render json: { customer: customer, address: address, person: person }
  end

  def destroy
    customer, person, address = select_customer
    provider = Provider.find_by(person_id: customer.person_id)

    ActiveRecord::Base.transaction do
      customer.destroy!
      provider.destroy! if provider
      address.destroy!
      person.destroy!
    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: "Falha na exclusão: #{e.message}" }, status: :unprocessable_entity
    end
  end

  private

  def select_customer
    customer = Customer.find(params[:id])
    person = customer.person
    address = Address.find_by(person_id: customer.person_id)

    return [customer, person, address]
  end

  def person_params
    params.require(:person).permit(:name, :email, :phone)
  end

  def address_params
    params.require(:address).permit(:street, :number, :cep, :observation, :address_type, :city, :state, :neighborhood)
  end

  def customer_params
    params.require(:customer).permit(:cpf, :rg, :last_name, :person_id)
  end
end
