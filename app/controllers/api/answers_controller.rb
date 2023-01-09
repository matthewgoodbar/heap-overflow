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
            render json: { errors: ["answers not found"] }
        end
    end

    def show
    end

    def create
    end

    def update
    end

    def destroy
    end

    private
    def answer_params
        params.require(:answer).permit(:author_id, :question_id, :body)
    end
end
