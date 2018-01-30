class Api::V1::ExperienceDetailsController < Api::V1::BaseController

    def index
      @user = User.find(params[:id])
      respond_with @user.experience_details
    end

    def update
      ed = ExperienceDetail.find(params[id])
      ed.update(details_params)
      respond_with ed
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
