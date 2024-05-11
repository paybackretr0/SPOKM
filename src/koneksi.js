const mysql = require("mysql2");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");

const db = new Sequelize("spokm", "root", "", {
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
});

module.exports = db;
