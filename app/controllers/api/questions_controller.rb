class Api::QuestionsController < ApplicationController

    before_action :require_logged_in, only: [:create, :update, :destroy]
    wrap_parameters include: Question.attribute_names + ['authorId']
    
    def index
        items_per_page = 10
        page = params[:page].to_i
        search_terms = params[:search].split(" ") if params[:search]

        if params[:search]
            @search_query = []
            search_terms.each do |term|
                @search_query << Question.where("title LIKE ?", "%#{term}%")
                                    .or(Question.where("body LIKE ?", "%#{term}%"))
            end
            @search_query = @search_query.reduce(:and)
        else
            @search_query = Question.all
        end
        @questions = @search_query.order(created_at: :desc).limit(items_per_page).offset(items_per_page * (page - 1))

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