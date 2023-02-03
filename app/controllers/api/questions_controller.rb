class Api::QuestionsController < ApplicationController

    before_action :require_logged_in, only: [:create, :update, :destroy]
    wrap_parameters include: Question.attribute_names + ['authorId']
    
    def index

        if params[:author]
            @questions = Question.where(author_id: params[:author].to_i)
            if @questions
                render :index
            else
                render json: { errors: ["question not found"] }, status: 404
            end
        end
        
        items_per_page = 10
        page = params[:page].to_i
        search_terms = params[:search].downcase.split(" ") if params[:search]

        if params[:search]
            @search_query = []
            search_terms.each do |term|
                @search_query << Question.where("LOWER(questions.title) LIKE ?", "%#{term}%")
                                    .or(Question.where("LOWER(questions.body) LIKE ?", "%#{term}%"))
            end
            @search_query = @search_query.reduce(:and)
        else
            @search_query = Question.all
        end

        order_parameter = params[:order]
        case order_parameter
        when "NEWEST"
            @order_query = @search_query.order(created_at: :desc)
        when "OLDEST"
            @order_query = @search_query.order(created_at: :asc)
        when "MOST_ANSWERED"
            @order_query = @search_query
                .left_joins(:answers)
                .group('questions.id')
                .order('COUNT(answers.id) DESC')
            # @questions = @search_query.sort {|a,b| a.answer_count <=> b.answer_count}
        when "LEAST_ANSWERED"
            @order_query = @search_query
                .left_joins(:answers)
                .group('questions.id')
                .order('COUNT(answers.id) ASC')
            # @questions = @search_query.sort {|a,b| b.answer_count <=> a.answer_count}
        else
        end

        @questions = @order_query.limit(items_per_page).offset(items_per_page * (page - 1))

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