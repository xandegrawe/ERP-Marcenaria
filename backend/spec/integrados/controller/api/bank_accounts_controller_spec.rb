# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::BankAccountsController, type: :controller do
  let(:valid_attributes) do
    { name: 'Banco do Brasil', inicial_balance: '1000' }
  end
  let(:invalid_attributes) do
    { name: nil }
  end

  describe 'GET #index' do
    before do
      BankAccount.create!(valid_attributes)
      get :index
    end

    it 'retorna uma resposta de sucesso' do
      expect(response).to have_http_status(:success)
    end

    it 'retorna todas as contas bancárias' do
      expect(JSON.parse(response.body).size).to eq(1)
    end

    it 'retorna a estrutura de dados esperada' do
      json_response = JSON.parse(response.body).first
      expect(json_response).to include('name', 'inicial_balance')
      expect(json_response['name']).to eq('Banco do Brasil')
    end
  end

  describe 'POST #create' do
    context 'com parâmetros válidos' do
      let(:new_account_attributes) { { name: 'Banco de Teste', inicial_balance: '200' } }

      it 'cria uma nova conta bancária' do
        expect(post(:create, params: { bank_account: new_account_attributes })).to have_http_status(:created)
      end

      it 'retorna a conta bancária criada' do
        post :create, params: { bank_account: new_account_attributes }
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)).to include('name' => new_account_attributes[:name])
      end
    end

    context 'com parâmetros inválidos' do
      it 'não cria uma nova conta bancária' do
        expect do
          post :create, params: { bank_account: invalid_attributes }
        end.to_not change(BankAccount, :count)
      end

      it 'retorna um status de entidade não processável' do
        post :create, params: { bank_account: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'retorna mensagens de erro detalhadas' do
        post :create, params: { bank_account: invalid_attributes }
        expect(JSON.parse(response.body)).to have_key('errors')
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:bank_account) { BankAccount.create!(valid_attributes) }

    it 'exclui a conta bancária' do
      expect do
        delete :destroy, params: { id: bank_account.id }
      end.to change(BankAccount, :count).by(-1)
    end

    it 'retorna uma mensagem de sucesso' do
      delete :destroy, params: { id: bank_account.id }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to eql('message' => 'Conta excluída com sucesso.')
    end
  end
end
