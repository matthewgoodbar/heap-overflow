class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password']

  def index
    items_per_page = 10
    page = params[:page].to_i
    search_terms = params[:search].downcase.split(" ") if params[:search]

    if params[:search]
    @search_query = []
    search_terms.each do |term|
      @search_query << User.where("LOWER(users.username) LIKE ?", "%#{term}%")
                            .or(User.where("LOWER(users.email) LIKE ?", "%#{term}%"))
    end
      @search_query = @search_query.reduce(:and)
    else
      @search_query = User.all
    end

    @users = @search_query.limit(items_per_page).offset(items_per_page * (page - 1))

    if @users
      render :index
    else
      render json: { errors: ["user not found"] }, status: 404
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: { errors: ["user not found"] }, status: 404
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
