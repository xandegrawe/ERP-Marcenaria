# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomerSerializer, type: :serializer do
  let!(:person_created) { Person.create!(name: 'João', phone: '123456789', email: 'joao@example.com') }
  let(:customer) do
    Customer.create!(cpf: '12345678901', rg: 'MG123456', last_name: 'Silva', person_id: person_created.id)
  end
  let(:serializer) { described_class.new(customer) }
  let(:serialization) { ActiveModelSerializers::Adapter.create(serializer) }
  let(:serialized_json) { JSON.parse(serialization.to_json) }

  it 'serializa a Clientes corretamente' do
    expect(serialized_json).to include(
      'id' => customer.id,
      'cpf' => customer.cpf,
      'rg' => customer.rg
    )
  end
end
