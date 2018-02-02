class Api::V1::WorksController < Api::V1::BaseController
    skip_before_action :authenticate_request, only: ['index']
    
    def index
      @user = User.find(params[:id])
      render json: @user.works
    end

    def bulk_update
      h = Hash[ *params["works"].values.collect { |v| [ v["id"], v.except("id") ] }.flatten ]
      current_user.works.update(h.keys, h.values)
      render json: { success: true }
    end

    def update
      @ed = current_user.works.find(params[:id])
      if @ed.update(details_params)
        render json: @ed
      else
        render json: { errors: @ed.errors.messages }, status: :bad_request
      end
    end

    def create
      @ed = current_user.works.new(details_params)
      if @ed.save
        render json: @ed
      else
        render json: { errors: @ed.errors.messages }, status: :bad_request
      end
    end

    private

    def details_params
      params.require(:work).permit(:year_of_start ,:year_of_end ,:designation ,:company_name, :location, :currently_working)
    end

end
