# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::PeopleController, type: :controller do
  let(:valid_attributes) do
    { name: 'João', phone: '123456789', email: 'teste@teste.com' }
  end
  let(:invalid_attributes) do
    { name: nil }
  end

  describe 'GET #index' do
    before do
      Person.create!(valid_attributes)
      get :index
    end

    it 'retorna uma resposta de sucesso' do
      expect(response).to have_http_status(:success)
    end

    it 'retorna todas as pessoas' do
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end
end
