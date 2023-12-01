# frozen_string_literal: true

class Role < ApplicationRecord
  belongs_to :person, polymorphic: true
end
