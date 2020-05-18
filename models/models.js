/* eslint-disable camelcase */
const { Sequelize, sequelize } = require("../config/connectionDb");
sequelize.sync();

module.exports = {
  Users: sequelize.define(
    "users",
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  ),

  Products: sequelize.define(
    "products",
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  ),
  Orders: sequelize.define(
    "orders",
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    },
    { timestamps: false }
  ),
};
