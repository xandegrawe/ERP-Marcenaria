# frozen_string_literal: true

class BankAccountService < ApplicationController
  def index
    BankAccount.all
  end

  def create(bank_account_params)
    return { error: 'Saldo inicial inválido ou ausente.' } unless bank_account_params[:inicial_balance].is_a?(String)

    ActiveRecord::Base.transaction do
      inicial_balance = formated_balance(bank_account_params[:inicial_balance])
      name = bank_account_params[:name]
      bank_account = BankAccount.create(name:, inicial_balance:)
      bank_account
    rescue ActiveRecord::RecordInvalid => e
      { error: e.message }
    end
  end

  def formated_balance(inicial_balance)
    formated_balance = inicial_balance.gsub(/(?<=\d)\.(?=\d{3}(?:,|$))/, '')
    formated_balance = formated_balance.gsub(',', '.')
    formated_balance.to_f
  end

  def show
    BankAccount.find(params[:id])
  end

  def destroy(bank_account)
    ActiveRecord::Base.transaction do
      bank_account.bank_invoices.destroy_all
      bank_account.destroy!

      { success: true, message: 'Conta excluída com sucesso.' }
    rescue ActiveRecord::RecordNotDestroyed => e
      { success: false, error: "Falha ao excluir a conta e suas faturas: #{e.record.errors.full_messages.to_sentence}" }
    rescue ActiveRecord::RecordInvalid => e
      { success: false, error: "Falha ao excluir a conta: #{e.message}" }
    rescue StandardError => e
      { success: false, error: "Erro inesperado: #{e.message}" }
    end
  end

  private

  def select_bank_account(params)
    BankAccount.find(params[:id])
  end
end
