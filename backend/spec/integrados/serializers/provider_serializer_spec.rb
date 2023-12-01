# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ProviderSerializer, type: :serializer do
  let!(:person_created) { Person.create!(name: 'João', phone: '123456789', email: 'joao@example.com') }
  let(:provider) { Provider.create!(cnpj: '123456879', person_id: person_created.id) }
  let(:serializer) { described_class.new(provider) }
  let(:serialization) { ActiveModelSerializers::Adapter.create(serializer) }
  let(:serialized_json) { JSON.parse(serialization.to_json) }

  it 'serializa a Fornecedores corretamente' do
    expect(serialized_json).to include(
      'id' => provider.id,
      'cnpj' => provider.cnpj,
      'person_id' => provider.person_id
    )
  end
end
