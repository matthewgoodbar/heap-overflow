class Api::VotesController < ApplicationController

    before_action :require_logged_in, only: [:create, :update, :destroy]
    wrap_parameters include: Vote.attribute_names + ['voterId', 'questionId', 'voteType']

    def create
        @vote = Vote.new(vote_params)
        if @vote.save
            render 'api/answers/show'
        else
            render json: { errors: ["unable to save vote"] }, status: :unprocessable_entity
        end
    end

    def update
        @vote = Vote.find_by(id: params[:id])
        if @vote && @vote.update(vote_params)
            render 'api/answers/show'
        else
            render json: { errors: ["unable to save vote"] }, status: :unprocessable_entity
        end
    end

    def destroy
        @vote = Vote.find_by(id: params[:id])
        if @vote.destroy
            render json: { message: "success" }
        end
    end

    private
    def vote_params
        params.require(:vote).permit(:voter_id, :question_id, :vote_type)
    end
end
