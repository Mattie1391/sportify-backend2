require('dotenv').config();
const User = require('../entities/User');

const { DataSource, useContainer } = require('typeorm');


const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
  logging: false
});

module.exports = { AppDataSource };

