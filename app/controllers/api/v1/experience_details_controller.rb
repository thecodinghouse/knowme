class Api::V1::ExperienceDetailsController < Api::V1::BaseController
    skip_before_action :authenticate_request, only: ['index']
    
    def index
      @user = User.find(params[:id])
      render json: @user.experience_details
    end

    def bulk_update
      h = Hash[ *params["experience_details"].values.collect { |v| [ v["id"], v.except("id") ] }.flatten ]
      ExperienceDetail.update(h.keys, h.values)
      render json: { success: true }
    end

    def update
      @ed = ExperienceDetail.find(params[:id])
      if @ed.update(details_params)
        render json: @ed
      else
        render json: { errors: @ed.errors.messages }, status: :bad_request
      end
    end

    def create
      @ed = ExperienceDetail.new(details_params)
      @ed.user = current_user
      if @ed.save
        render json: @ed
      else
        render json: { errors: @ed.errors.messages }, status: :bad_request
      end
    end

    private

    def details_params
      params.require(:experience_detail).permit(:year_of_start ,:year_of_end ,:designation ,:company_name, :location, :currently_working)
    end

end
