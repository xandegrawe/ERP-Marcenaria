# frozen_string_literal: true

class CategoryService < ApplicationController
  def initialize(id = nil)
    @id = id
  end

  def create(category_name)
    ActiveRecord::Base.transaction do
      category = Category.create(name: category_name)
      category
    rescue ActiveRecord::RecordInvalid => e
      { error: e.message }
    end
  end

  def destroy(category_params)
    category = select_category
    ActiveRecord::Base.transaction do
      BankInvoice.where(category_id: category.id).update_all(category_id: nil)
      category.destroy!
      { message: 'Cliente excluído com sucesso' }
    rescue ActiveRecord::RecordInvalid => e
      { error: e.message }
    end
  end

  private

  def select_category
    category = Category.find(@id)
    category
  end
end