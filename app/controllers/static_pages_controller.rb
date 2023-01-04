class StaticPagesController < ApplicationController
    def frontend
        render file: Rails.root.join('public', 'index.html')
    end
end
