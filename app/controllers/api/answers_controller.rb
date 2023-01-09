class Api::AnswersController < ApplicationController

    before_action :require_logged_in, only: [:create, :update, :destroy]
    wrap_parameters include: Answer.attribute_names + ['authorId', 'questionId']

    def index
        author_id = params[:author]
        question_id = params[:question]
        if author_id
            @answers = Answer.find_by(author_id: author_id)
        elsif question_id
            @answers = Answer.find_by(question_id: question_id)
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
