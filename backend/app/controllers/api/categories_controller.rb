# frozen_string_literal: true

module Api
  class CategoriesController < ApplicationController
    def index
      categories = Category.all
      render json: categories
    end

    def create
      result = category_service.create(params[:category]['name'])

      if result[:error]
        render json: { errors: "Falha na criação: #{result[:error]}" }, status: :unprocessable_entity
      else
        render json: result, status: :created
      end
    end

    def destroy
      result = category_service.destroy(category_params)

      if result[:error]
        render json: { errors: "Falha na exclusão: #{result[:error]}" }, status: :unprocessable_entity
      else
        render json: result, status: :ok
      end
    end

    private

    def category_params
      params.permit(:name, :id)
    end

    def category_service
      @category_service ||= CategoryService.new(params[:id])
    end
  end
end
