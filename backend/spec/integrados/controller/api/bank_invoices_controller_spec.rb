# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::BankInvoicesController, type: :controller do
  let(:bank_account) { BankAccount.create!(name: 'Banco do Brasil', inicial_balance: '1000') }
  let(:valid_attributes) do
    { note: 'Fatura Teste', amount: '100', status: 'Entrada', bank_account_id: bank_account.id }
  end
  let(:invalid_attributes) do
    { note: nil }
  end

  describe 'GET #index' do
    before do
      BankInvoice.create!(valid_attributes)
      get :index
    end

    it 'retorna uma resposta de sucesso' do
      expect(response).to have_http_status(:success)
    end

    it 'retorna todas as faturas' do
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end

  describe 'GET #show' do
    let!(:bank_invoice) { BankInvoice.create!(valid_attributes) }

    it 'retorna uma resposta de sucesso' do
      get :show, params: { id: bank_invoice.id }
      expect(response).to have_http_status(:success)
    end

    it 'retorna a fatura' do
      get :show, params: { id: bank_invoice.id }
      expect(JSON.parse(response.body)).to include('note' => bank_invoice.note)
    end
  end

  describe 'POST #create' do
    context 'com parâmetros válidos' do
      it 'cria uma nova fatura' do
        expect(post(:create, params: { bank_invoice: valid_attributes })).to have_http_status(:created)
      end
      it 'retorna a fatura criada' do
        post :create, params: { bank_invoice: valid_attributes }
        expect(JSON.parse(response.body)).to include('note' => valid_attributes[:note])
      end
    end

    context 'com parâmetros inválidos' do
      it 'não cria uma nova fatura' do
        expect do
          post :create, params: { bank_invoice: invalid_attributes }
        end.to_not change(BankInvoice, :count)
      end
    end
  end

  describe 'PUT #update' do
    let!(:bank_invoice) { BankInvoice.create!(valid_attributes) }
    let(:new_attributes) { { note: 'Fatura Atualizada' } }

    it 'atualiza a fatura' do
      put :update, params: { id: bank_invoice.id, bank_invoice: new_attributes }
      bank_invoice.reload
      expect(bank_invoice.note).to eq('Fatura Atualizada')
    end
  end

  describe 'DELETE #destroy' do
    let!(:bank_invoice) { BankInvoice.create!(valid_attributes) }

    it 'exclui a fatura' do
      expect do
        delete :destroy, params: { id: bank_invoice.id }
      end.to change(BankInvoice, :count).by(-1)
    end
  end

  describe 'GET #calculate_summary' do
    let!(:bank_account) { BankAccount.create!(name: 'Caixa', inicial_balance: '200') }

    it 'retorna um resumo das faturas' do
      get :calculate_summary, params: { id: bank_account.id }
      expect(response).to have_http_status(:success)
    end
  end
end
