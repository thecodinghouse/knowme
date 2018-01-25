class UsersController < ApplicationController

    def index
        respond_with User.all
    end    
    
    def create
    end

    def update
    end

    def show
    end
end
