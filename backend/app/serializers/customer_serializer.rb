# frozen_string_literal: true

class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :cpf, :rg, :last_name, :person_id
end
