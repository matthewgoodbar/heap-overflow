class Api::QuestionsController < ApplicationController

    before_action :require_logged_in, only: [:create, :update, :destroy]
    
    def index
        @questions = Question.all
        if @questions
            render :index
        else
            render json: { questions: nil }
        end
    end

    def show
        @question = Question.find_by(id: params[:id])
        if @question
            render :show
        else
            render json: { questions: nil }
        end
    end

    def create
    end

    def update
    end

    def destroy
    end

    private
    def question_params
        params.require(:question).permit(:author_id, :title, :body)
    end
end