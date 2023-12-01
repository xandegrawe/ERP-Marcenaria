# frozen_string_literal: true

ActiveRecord::Schema[7.0].define(version: 20_231_126_223_538) do
  enable_extension 'plpgsql'

  create_table 'addresses', force: :cascade do |t|
    t.string 'street'
    t.string 'number'
    t.string 'cep', null: false
    t.text 'observation', null: false
    t.string 'address_type', null: false
    t.bigint 'person_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'city', null: false
    t.string 'state', null: false
    t.string 'neighborhood', null: false
    t.index ['person_id'], name: 'index_addresses_on_person_id'
  end

  create_table 'bank_accounts', force: :cascade do |t|
    t.string 'name'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.decimal 'inicial_balance'
    t.decimal 'current_balance'
  end

  create_table 'bank_invoices', force: :cascade do |t|
    t.bigint 'bank_account_id', null: false
    t.bigint 'category_id'
    t.bigint 'person_id'
    t.decimal 'amount'
    t.integer 'status'
    t.date 'due_date'
    t.string 'note'
    t.integer 'current_installment'
    t.integer 'total_installments'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['bank_account_id'], name: 'index_bank_invoices_on_bank_account_id'
    t.index ['category_id'], name: 'index_bank_invoices_on_category_id'
    t.index ['person_id'], name: 'index_bank_invoices_on_person_id'
  end

  create_table 'categories', force: :cascade do |t|
    t.string 'name'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'customers', force: :cascade do |t|
    t.bigint 'person_id', null: false
    t.string 'cpf'
    t.string 'rg'
    t.string 'last_name'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['person_id'], name: 'index_customers_on_person_id'
  end

  create_table 'people', force: :cascade do |t|
    t.string 'name'
    t.string 'phone'
    t.string 'email'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'providers', force: :cascade do |t|
    t.bigint 'person_id', null: false
    t.string 'cnpj'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['person_id'], name: 'index_providers_on_person_id'
  end

  create_table 'roles', force: :cascade do |t|
    t.string 'name'
    t.string 'person_type', null: false
    t.bigint 'person_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[person_type person_id], name: 'index_roles_on_person'
  end

  add_foreign_key 'addresses', 'people'
  add_foreign_key 'bank_invoices', 'bank_accounts'
  add_foreign_key 'bank_invoices', 'categories'
  add_foreign_key 'bank_invoices', 'people'
  add_foreign_key 'customers', 'people'
  add_foreign_key 'providers', 'people'
end
