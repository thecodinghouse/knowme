# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create!(email: 'admin@knowme.com' , password: 'admin123' , password_confirmation: 'admin123', admin: true)
Profile.create!(name: 'admin', birthday: Date.new(1990, 12, 8), user: user)

