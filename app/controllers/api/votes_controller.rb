class Api::VotesController < ApplicationController

    before_action :require_logged_in, only: [:create, :update, :destroy]
    wrap_parameters include: Vote.attribute_names + ['voterId', 'answerId', 'voteType']

    def create
        @vote = Vote.new(vote_params)
        if @vote.save
            @answer = Answer.find_by(id: @vote.answer_id)
            render 'api/answers/show'
        else
            render json: { errors: ["unable to save vote"] }, status: :unprocessable_entity
        end
    end

    def update
        @vote = Vote.find_by(id: params[:id])
        if @vote && @vote.update(vote_params)
            @answer = Answer.find_by(id: @vote.answer_id)
            render 'api/answers/show'
        else
            render json: { errors: ["unable to save vote"] }, status: :unprocessable_entity
        end
    end

    def destroy
        @vote = Vote.find_by(id: params[:id])
        @answer = Answer.find_by(id: @vote.answer_id)
        if @vote && @vote.destroy
            render 'api/answers/show'
        else
            render json: { errors: ["unable to delete vote"] }, status: :unprocessable_entity
        end
    end

    private
    def vote_params
        params.require(:vote).permit(:voter_id, :answer_id, :vote_type)
    end
end
