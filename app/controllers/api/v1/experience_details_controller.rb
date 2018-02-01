class Api::V1::ExperienceDetailsController < Api::V1::BaseController

    def index
      @user = User.find(params[:id])
      render json: @user.experience_details
    end

    def bulk_update
      h = Hash[ *params["experience_details"].values.collect { |v| [ v["id"], v.except("id") ] }.flatten ]
      ExperienceDetail.update(h.keys, h.values)
      render json: { success: true }
    end

    def create
      ed = ExperienceDetail.new(details_params)
      ed.save()
      respond_with ed
    end

    private

    def details_params
      params.require(:experience_detail).permit(:year_of_start ,:year_of_end ,:designation ,:company_name, :location, :currently_working)
    end

end
