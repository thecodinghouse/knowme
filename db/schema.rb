# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180130093122) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "educational_details", force: :cascade do |t|
    t.date     "year_of_start"
    t.date     "year_of_end"
    t.string   "degree"
    t.string   "field_of_study"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "user_id"
    t.index ["user_id"], name: "index_educational_details_on_user_id", using: :btree
  end

  create_table "experience_details", force: :cascade do |t|
    t.string   "company_name"
    t.date     "year_of_start"
    t.date     "year_of_end"
    t.string   "designation"
    t.string   "location"
    t.boolean  "currently_working"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "user_id"
    t.index ["user_id"], name: "index_experience_details_on_user_id", using: :btree
  end

  create_table "skills", force: :cascade do |t|
    t.string   "skill_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skills_and_users", force: :cascade do |t|
    t.integer "user_id"
    t.integer "skill_id"
    t.index ["skill_id"], name: "index_skills_and_users_on_skill_id", using: :btree
    t.index ["user_id"], name: "index_skills_and_users_on_user_id", using: :btree
  end

  create_table "user_details", force: :cascade do |t|
    t.string   "name"
    t.date     "dob"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_details_on_user_id", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "auth_token"
    t.index ["auth_token"], name: "index_users_on_auth_token", unique: true, using: :btree
  end

  add_foreign_key "educational_details", "users"
  add_foreign_key "experience_details", "users"
end
