class Api::AnswersController < ApplicationController

    before_action :require_logged_in, only: [:create, :update, :destroy]
    wrap_parameters include: Answer.attribute_names + ['authorId', 'questionId']

    def index
        if params[:author]
            @answers = Answer.where(author_id: params[:author].to_i)
        elsif params[:question]
            @answers = Answer.where(question_id: params[:question].to_i)
        end

        if @answers
            render :index
        else
            render json: { errors: ["answers not found"] }, status: 404
        end
    end

    def show
        @answer = Answer.find_by(id: params[:id])
        if @answer
            render :show
        else
            render json: { errors: ["answer not found"] }, status: 404
        end
    end

    def create
        @answer = Answer.new(answer_params)
        if @answer.save
            render :show
        else
            render json: { errors: @answer.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @answer = Answer.find_by(id: params[:id])
        if @answer && @answer.update(answer_params)
            render :show
        else
            render json: { errors: @answer.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @answer = Answer.find_by(id: params[:id])
        if @answer.destroy
            render json: { message: "success" }
        end
    end

    private
    def answer_params
        params.require(:answer).permit(:author_id, :question_id, :body)
    end
end
