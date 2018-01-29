class SiteController < ApplicationController 
    layout "application"

    def index 
        render component: 'Main'
    end 
end
    