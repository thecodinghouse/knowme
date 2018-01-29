class Api::V1::BaseController < ApplicationController 
    respond_to :json 
    skip_before_action :require_login 
    before_action :authenticate_request 
    attr_reader :current_user 

    private 
  
    def authenticate_request 
        @current_user = AuthorizeApiRequest.call(request.headers).result 
        render json: { error: 'Not Authorized' }, status: 401 unless @current_user 
    end 
end