const { Sequelize, sequelize } = require("../config/connectionDb");

module.exports = {
  Table1: sequelize.define(
    "table1",
    {
      table1Name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      table1Bool: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      table1Number: {
        type: Sequelize.INTEGER,
        default: false,
      },
    },
    { timestamps: false }
  ),
  Table2: sequelize.define(
    "table2",
    {
      table2Name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      table2Bool: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      table2Number: {
        type: Sequelize.INTEGER,
        default: false,
      },
    },
    { timestamps: false }
  ),
};
