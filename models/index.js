const Sequelize = require('sequelize')
const fs = require("fs")
const path = require("path")
const basename = path.basename(__filename);
require('dotenv').config()

//Getting dbconnection variables from .env
const connection = {
  database: process.env.DATABASE_NAME,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  dialectmodel: process.env.DIALECTMODEL,
};

const connectionUrl = `${connection.dialect}://${connection.username}:${connection.password}@${connection.host}/${connection.database}`;
//establishing connection with database and adding models to db object
const sequelize = new Sequelize(connectionUrl, {
logging: false
});
const db = {}
db.sequelize = sequelize
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) &&   
      (file.slice(-3) === '.js');
    })
  .forEach(file => {    
    const model = require(path.join(__dirname, file))(sequelize,   
      Sequelize);
    db[model.name] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db
