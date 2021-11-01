const dbConfig = require("../config/db.config");

const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging:true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.blog_category = require("./blog_category.model.js")(sequelize, Sequelize);
db.blog = require("./blog.model.js")(sequelize, Sequelize);

module.exports = db;