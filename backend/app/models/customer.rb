# frozen_string_literal: true

class Customer < ApplicationRecord
  belongs_to :person
end
