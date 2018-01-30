class SiteController < ApplicationController 
    skip_before_action :require_login 

    def index 
        render component: 'Main'
    end 
end
    