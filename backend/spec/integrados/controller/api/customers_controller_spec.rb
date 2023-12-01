# frozen_string_literal: true

# spec/controllers/api/customers_controller_spec.rb

require 'rails_helper'

RSpec.describe Api::CustomersController, type: :controller do
  let!(:person_params) { { name: 'teste', email: 'email@aa', phone: '' } }
  let!(:person_created) { Person.create!(name: 'João', phone: '123456789', email: 'joao@example.com') }
  let!(:address_params) { { city: '', state: '', neighborhood: '', street: '', observation: '', cep: '' } }
  let!(:customer_params) { { cpf: '12345678901', rg: 'MG123456', last_name: 'Silva' } }

  describe 'GET #index' do
    before do
      Customer.create!(customer_params.merge(person_id: person_created.id))
      get :index
    end

    after do
      Customer.destroy_all
    end

    it 'retorna uma resposta de sucesso' do
      expect(response).to have_http_status(:success)
    end

    it 'retorna todos os clientes' do
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end

  describe 'POST #create' do
    context 'com parâmetros válidos' do
      it 'cria um novo cliente' do
        post :create, params: { customer: customer_params, person: person_params, address: address_params }
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)).to include({ 'id' => Customer.last.id, 'name' => 'teste',
                                                       'last_name' => 'Silva', 'phone' => '' })
      end
    end

    context 'com parâmetros inválidos' do
      it 'não cria um novo cliente' do
        person_params[:name] = nil
        post :create, params: { customer: customer_params, person: person_params, address: address_params }
        expect { response }.to_not change(Customer, :count)
      end
    end
  end

  describe 'GET #show' do
    let!(:customer) { Customer.create!(customer_params.merge(person_id: person_created.id)) }

    it 'retorna uma resposta de sucesso' do
      get :show, params: { id: customer.id }
      expect(response).to have_http_status(:success)
    end

    it 'retorna o cliente' do
      get :show, params: { id: customer.id }
      json_response = JSON.parse(response.body)
      expect(json_response['customer']['id']).to eq(customer.id)
      expect(json_response['customer']['last_name']).to eq(customer.last_name)
    end
  end

  describe 'PUT #update' do
    let!(:customer) { Customer.create!(customer_params.merge(person_id: person_created.id)) }
    let(:new_attributes) { { last_name: 'Atualizado' } }

    it 'atualiza o cliente' do
      put :update, params: { id: customer.id, customer: new_attributes, person: person_params, address: address_params }
      customer.reload
      expect(customer.last_name).to eq('Atualizado')
    end
  end

  describe 'DELETE #destroy' do
    let!(:customer) { Customer.create!(customer_params.merge(person_id: person_created.id)) }
    it 'exclui o cliente' do
      expect do
        delete :destroy, params: { id: customer.id }
      end.to change(Customer, :count).by(-1)
    end
  end
end
