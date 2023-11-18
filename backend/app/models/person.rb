class Person < ApplicationRecord
  has_one :customer
  has_one :supplier
  has_many :addresses
end
