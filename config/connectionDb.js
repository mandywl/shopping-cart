const Sequelize = require("sequelize");
const config = require("./config.json").development;
const myRegex = /[\w]+:..([\w]+):([\w]+)@([\w.-]+):[\w]+\/([\w]+)/i;

let { username, password, host, database } = config;

if (process.env.JAWSDB_URL) {
  // eslint-disable-next-line no-unused-vars
  [_, username, password, host, database] = myRegex.exec(
    process.env.JAWSDB_URL
  );
}

module.exports = {
  sequelize: (sequelize = new Sequelize(database, username, password, {
    host,
    dialect: "mysql",
  })),
  Sequelize: Sequelize,
};
