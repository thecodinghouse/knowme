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
                UserDetail.create!(name: auth.info.name , user: user)
            end
            account.user = user
            account.save!
        end
        # if auth.provider == 'facebook'
        #     facebook = Koala::Facebook::API.new(auth.credentials.token)
        #     profile = facebook.get_object("me?fields=name,id,education,work,location,birthday,hometown")
        #     client = Client.where(client_params.slice(:email, :phone)).first_or_create
        #     client.update(client_params)    
        #     account.user.educational_details.where()
        # end

    end
end
