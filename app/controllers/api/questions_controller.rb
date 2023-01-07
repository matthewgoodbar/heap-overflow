class Api::QuestionsController < ApplicationController

    before_action :require_logged_in, only: [:create, :update, :destroy]
    wrap_parameters include: Question.attribute_names + ['authorId']
    
    def index
        items_per_page = 10
        @page = params[:page].to_i
        # @questions = Question.all
        @questions = Question.order(created_at: :desc).limit(items_per_page).offset(items_per_page * (@page - 1))
        if @questions
            render :index
        else
            render json: { errors: ["question not found"] }, status: 404
        end
    end

    def show
        @question = Question.find_by(id: params[:id])
        if @question
            render :show
        else
            render json: { errors: ["question not found"] }, status: 404
        end
    end

    def create
        @question = Question.new(question_params)
        if @question.save
            render :show
        else
            render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @question = Question.find_by(id: params[:id])
        # debugger
        if @question && @question.update(question_params)
            render :show
        else
            render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @question = Question.find_by(id: params[:id])
        if @question.destroy
            render json: { message: "success" }
        end
    end

    private
    def question_params
        params.require(:question).permit(:author_id, :title, :body)
    end
end