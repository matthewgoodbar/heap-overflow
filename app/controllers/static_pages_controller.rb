class StaticPagesController < ApplicationController::Base
    def frontend
        render file: Rails.root.join('public', 'index.html')
    end
end
