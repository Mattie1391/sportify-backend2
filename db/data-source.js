const { DataSource } = require("typeorm");
require("dotenv").config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "sportify",
  password: process.env.DB_PASSWORD || "test1234",
  database: process.env.DB_NAME || "test",
  // synchronize: true, //開發時 true，部署時請改為 false 並使用 migration
  logging: true,
  entities: [
    require("../entities/Admin"),
    require("../entities/User"),
    require("../entities/Coach"),
    require("../entities/Course"),
    require("../entities/Subscription"),
    require("../entities/Rating"),
    require("../entities/Coach_Skill"),
    require("../entities/Skill"),
    require("../entities/User_Course_Favorite"),
    require("../entities/Course_Chapter"),
    require("../entities/Payment_Transfer"),
  ],
});

module.exports = AppDataSource;
