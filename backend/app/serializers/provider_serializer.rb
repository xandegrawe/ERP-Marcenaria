# frozen_string_literal: true

class ProviderSerializer < ActiveModel::Serializer
  attributes :id, :cnpj, :person_id
end
