# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CategoriesController, type: :controller do
  let!(:categorias) { Category.create!([{ name: 'Categoria 1' }, { name: 'Categoria 2' }, { name: 'Categoria 3' }]) }

  describe 'GET #index' do
    it 'retorna uma resposta de sucesso' do
      get :index
      expect(response).to be_successful
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end

  describe 'POST #create' do
    context 'com parâmetros válidos' do
      it 'cria uma nova Categoria' do
        expect do
          post :create, params: { category: { name: 'Nova Categoria' } }
        end.to change(Category, :count).by(1)
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'com parâmetros válidos' do
      it 'deleta a Categoria' do
        expect do
          delete :destroy, params: { id: categorias.first.id }
        end.to change(Category, :count).by(-1)
        expect(response).to be_successful
      end
    end
  end
end
