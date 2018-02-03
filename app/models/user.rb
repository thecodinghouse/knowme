class User < ApplicationRecord
    has_secure_password
    has_secure_token :auth_token
    has_one :profile
    validates :email, presence: true, uniqueness: true
    has_many :social_accounts
    has_many :educations
    has_many :works
    has_many :achievements
    has_and_belongs_to_many :skills, through: :skills_users
    has_many :projects


    def self.from_omniauth(auth)
        account = SocialAccount.where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |account|
            account.email = auth.info.email
            account.uid = auth.uid
            account.provider = auth.provider
            account.avatar_url = auth.info.image
            account.username = auth.info.name
            account.oauth_token = auth.credentials.token
            # create user object if not there
            user = User.find_by_email(auth.info.email)
            if user.blank?
                user = User.create!(email: auth.info.email , password: auth.info.name , password_confirmation: auth.info.name)
                Profile.create!(name: auth.info.name , user: user, image_url: auth.info.image)
            end
            account.user = user
            account.save!
        end
        if auth.provider == 'facebook'
            facebook = Koala::Facebook::API.new(auth.credentials.token)
            profile = facebook.get_object("me?fields=education,work,location,birthday,hometown")
            
            profile["education"] && profile["education"].each do |e|
                unless e["school"].blank?
                    account.user.educations.where('lower(institution) = ?', e["school"]["name"].downcase).first_or_initialize.tap do |edu|
                        edu.institution = e["school"]["name"]
                        edu.field_of_study =  e["concentration"][0]["name"] unless e["concentration"].blank?
                        edu.save!
                        #ed.update(type: e["type"]) unless e["type"].blank?
                    end
                end
            end

            profile["work"] && profile["work"].each do |w|
                unless w["employer"].blank?
                    account.user.works.where('lower(company_name) = ?', w["employer"]["name"]).first_or_initialize.tap do |wrk|
                        wrk.company_name = w["employer"]["name"]
                        wrk.location =  w["location"]["name"] unless w["location"].blank?
                        wrk.designation = w["position"]["name"] unless w["position"].blank?
                        wrk.year_of_start = w["start_date"] unless w["start_date"].blank?
                        wrk.year_of_end = w["end_date"] unless w["end_date"].blank?
                        wrk.save!
                    end
                end    
            end

            account.user.profile.update(birthday: profile["birthday"]) unless profile["birthday"].blank?
            #account.user.profile.update(hometown: profile["hometown"]) unless profile["hometown"].blank?
        end
        
        return account
    end
end
