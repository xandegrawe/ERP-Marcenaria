# frozen_string_literal: true

# spec/controllers/api/customers_controller_spec.rb

require 'rails_helper'

RSpec.describe Api::ProvidersController, type: :controller do
  let!(:person_params) { { name: 'teste', email: 'email@aa', phone: '' } }
  let!(:person_created) { Person.create!(name: 'João', phone: '123456789', email: 'joao@example.com') }
  let!(:address_params) { { city: '', state: '', neighborhood: '', street: '', observation: '', cep: '' } }
  let!(:providers_params) { { cnpj: '12345678901' } }

  describe 'GET #index' do
    before do
      Provider.create!(providers_params.merge(person_id: person_created.id))
      get :index
    end

    after do
      Provider.destroy_all
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
      it 'cria um novo fornecedor' do
        post :create, params: { provider: providers_params, person: person_params, address: address_params }
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)).to include({ 'id' => Provider.last.id, 'cnpj' => '12345678901' })
      end
    end

    context 'com parâmetros inválidos' do
      it 'não cria um novo fornecedor' do
        person_params[:name] = nil
        post :create, params: { provider: providers_params, person: person_params, address: address_params }
        expect { response }.to_not change(Provider, :count)
      end
    end
  end

  describe 'GET #show' do
    let!(:provider) { Provider.create!(providers_params.merge(person_id: person_created.id)) }

    it 'retorna uma resposta de sucesso' do
      get :show, params: { id: provider.id }
      expect(response).to have_http_status(:success)
    end

    it 'retorna o fornecedor' do
      get :show, params: { id: provider.id }
      json_response = JSON.parse(response.body)
      expect(json_response['provider']['id']).to eq(provider.id)
      expect(json_response['provider']['cnpj']).to eq(provider.cnpj)
    end
  end

  describe 'PUT #update' do
    let!(:provider) { Provider.create!(providers_params.merge(person_id: person_created.id)) }
    let(:new_attributes) { { cnpj: '987654321' } }

    it 'atualiza o fornecedor' do
      put :update, params: { id: provider.id, provider: new_attributes, person: person_params, address: address_params }
      provider.reload
      expect(provider.cnpj).to eq('987654321')
    end
  end

  describe 'DELETE #destroy' do
    let!(:provider) { Provider.create!(providers_params.merge(person_id: person_created.id)) }
    it 'exclui o fornecedor' do
      expect do
        delete :destroy, params: { id: provider.id }
      end.to change(Provider, :count).by(-1)
    end
  end
end
