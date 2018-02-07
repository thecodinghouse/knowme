class Profile < ApplicationRecord

    belongs_to :user
    validates_format_of :contact_no, with: /\A(?:\+?\d{1,3}\s*-?)?\(?(?:\d{3})?\)?[- ]?\d{3}[- ]?\d{4}\z/, allow_nil: true
end
