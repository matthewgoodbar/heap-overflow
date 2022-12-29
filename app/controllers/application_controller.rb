class ApplicationController < ActionController::API

    before_action :snake_case_params
    
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_logged_in
        unless current_user
            render json: {message: 'Unauthorized'}, status: :unauthorized
        end
    end

    def logged_in?
        !!current_user
    end

    def login(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    private
    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end
end
