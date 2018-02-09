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

ActiveRecord::Schema.define(version: 20180209114110) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "achievements", force: :cascade do |t|
    t.string   "title"
    t.date     "year_issued"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "user_id"
    t.index ["user_id"], name: "index_achievements_on_user_id", using: :btree
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_type"
    t.integer  "resource_id"
    t.string   "author_type"
    t.integer  "author_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree
  end

  create_table "educations", force: :cascade do |t|
    t.string   "institution"
    t.date     "year_of_start"
    t.date     "year_of_end"
    t.string   "degree"
    t.string   "field_of_study"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "user_id"
    t.string   "education_type"
    t.index ["user_id"], name: "index_educations_on_user_id", using: :btree
  end

  create_table "photos", force: :cascade do |t|
    t.binary   "data"
    t.string   "file_name"
    t.string   "content_type"
    t.integer  "user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["user_id"], name: "index_photos_on_user_id", using: :btree
  end

  create_table "profiles", force: :cascade do |t|
    t.string   "name"
    t.date     "birthday"
    t.string   "image_url"
    t.integer  "user_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "current_location"
    t.string   "hobbies"
    t.string   "languages"
    t.string   "hometown"
    t.string   "marital_status"
    t.string   "about_me"
    t.string   "contact_no"
    t.string   "title"
    t.index ["user_id"], name: "index_profiles_on_user_id", unique: true, using: :btree
  end

  create_table "projects", force: :cascade do |t|
    t.string   "title"
    t.integer  "team_size"
    t.string   "description"
    t.text     "project_url"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "user_id"
    t.index ["user_id"], name: "index_projects_on_user_id", using: :btree
  end

  create_table "skills", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skills_users", id: false, force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "skill_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "social_accounts", force: :cascade do |t|
    t.string   "username"
    t.string   "avatar_url"
    t.string   "email"
    t.string   "uid"
    t.string   "provider"
    t.string   "oauth_token"
    t.integer  "user_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.jsonb    "meta_info",   default: {}
    t.index ["user_id"], name: "index_social_accounts_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.boolean  "admin"
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.string   "auth_token"
    t.uuid     "uuid",            default: -> { "uuid_generate_v4()" }
    t.index ["auth_token"], name: "index_users_on_auth_token", unique: true, using: :btree
  end

  create_table "works", force: :cascade do |t|
    t.string   "company_name"
    t.date     "year_of_start"
    t.date     "year_of_end"
    t.string   "designation"
    t.string   "location"
    t.boolean  "currently_working"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "user_id"
    t.index ["user_id"], name: "index_works_on_user_id", using: :btree
  end

  add_foreign_key "achievements", "users"
  add_foreign_key "educations", "users"
  add_foreign_key "photos", "users"
  add_foreign_key "projects", "users"
  add_foreign_key "social_accounts", "users"
  add_foreign_key "works", "users"
end
