const { DataSource } = require("typeorm");
const Admin = require("../entities/Admin");
const User = require("../entities/User");
const Coach = require("../entities/Coach");
const Course = require("../entities/Course");
const Subscription =require("../entities/Subscription");
const Rating = require("../entities/Rating");
const CoachSkill = require("../entities/Coach_Skill");
const Skill = require("../entities/Skill");
const UserCourseFavorite = require("../entities/User_Course_Favorite");
const CourseChapter = require("../entities/Course_Chapter");
const PaymentTransfer  = require("../entities/Payment_Transfer");
require("dotenv").config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "sportify",
  password: process.env.DB_PASSWORD || "test1234",
  database: process.env.DB_NAME || "test",
  synchronize: true, //開發時 true，部署時請改為 false 並使用 migration
  logging: true,
  entities: [
    Admin,
    User,
    Coach,
    Course,
    Subscription,
    Rating,
    CoachSkill,
    Skill,
    UserCourseFavorite,
    CourseChapter,
    PaymentTransfer,
  ],
});

module.exports = AppDataSource;
