# frozen_string_literal: true

class BankAccount < ApplicationRecord
  has_many :bank_invoices
end
