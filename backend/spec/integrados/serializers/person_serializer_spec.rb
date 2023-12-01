# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PersonSerializer, type: :serializer do
  let!(:person) { Person.create!(name: 'João', phone: '123456789', email: 'joao@example.com') }
  let(:serializer) { described_class.new(person) }
  let(:serialization) { ActiveModelSerializers::Adapter.create(serializer) }
  let(:serialized_json) { JSON.parse(serialization.to_json) }

  it 'serializa a Person corretamente' do
    expect(serialized_json).to include(
      'id' => person.id,
      'name' => person.name
    )
  end
end
