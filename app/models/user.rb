class User < ApplicationRecord
    has_secure_password
    validates :password, length: { minimum: 6, maximum: 20 }, on: :create
    has_secure_token :auth_token
    has_one :profile
    validates :email, presence: true, uniqueness: true
    validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
    has_many :social_accounts
    has_many :educations
    has_many :works
    has_many :achievements
    has_and_belongs_to_many :skills, through: :skills_users
    has_many :projects
    delegate :url_helpers, to: 'Rails.application.routes'

    def self.from_omniauth(auth, user)
        account = SocialAccount.where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |account|
            account.email = auth.info.email
            account.uid = auth.uid
            account.provider = auth.provider
            account.avatar_url = auth.info.image
            if auth.provider == "stackexchange"
                account.username = auth.info.nickname
            else
                account.username = auth.info.name
            end
            account.oauth_token = auth.credentials.token
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
                        edu.education_type =  e["type"] unless e["type"].blank?
                        edu.save!
                    end
                end
            end

            profile["work"] && profile["work"].each do |w|
                unless w["employer"].blank?
                    account.user.works.where('lower(company_name) = ?', w["employer"]["name"].downcase).first_or_initialize.tap do |wrk|
                        wrk.company_name = w["employer"]["name"]
                        wrk.location =  w["location"]["name"] unless w["location"].blank?
                        wrk.designation = w["position"]["name"] unless w["position"].blank?
                        wrk.year_of_start = w["start_date"] unless w["start_date"].blank?
                        if w["end_date"].blank?
                            wrk.currently_working = true
                        else
                            wrk.year_of_end = w["end_date"] 
                        end
                        wrk.save!
                    end
                end    
            end

            account.user.profile.update(birthday: profile["birthday"]) unless profile["birthday"].blank?
            account.user.profile.update(hometown: profile["hometown"]["name"]) unless profile["hometown"].blank?
            account.user.profile.update(current_location: profile["location"]["name"]) unless profile["location"].blank?
        end
        if auth.provider == 'github'
            github = Github.new
            repos = github.repos.list user: auth.info.nickname
            account.meta_info = JSON.parse(repos.to_json)
            account.save!
        end
        if auth.provider == 'stackexchange'
            response = RubyStackoverflow.users_tags([auth.uid],{min: 1, max: 10, sort: 'popular' })
            response.data.first.tags.each do |tag|
                @skill = Skill.find_or_create_by(name: tag.name)
                user.skills << @skill
            end
            account.meta_info = JSON.parse(auth.extra.to_json)
            account.save!
        end

        return account
    end

    def page
        page = url_helpers.user_path(self.id)
        providers = self.social_accounts.map(&:provider)
        if !(providers.include? "github") 
            page = url_helpers.github_path(self.id)
        elsif !(providers.include? "stackexchange")
            page = url_helpers.stackoverflow_path(self.id)
        end
        return page
    end
end
