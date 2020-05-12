const { sequelize } = require("../config/connectionDb");

module.exports = {
  Table1: sequelize.define(
    "table1",
    {
      table1_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      table1_bool: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      table1_numnber: {
        type: Sequelize.INTEGER,
        default: false,
      },
    },
    { timestamps: false }
  ),
  Table2: sequelize.define(
    "table2",
    {
      table2_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      table2_bool: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      table2_numnber: {
        type: Sequelize.INTEGER,
        default: false,
      },
    },
    { timestamps: false }
  ),
};
