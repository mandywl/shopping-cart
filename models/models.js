/* eslint-disable camelcase */
const { Sequelize, sequelize } = require("../config/connectionDb");

module.exports = {
  Users: sequelize.define(
    "users",
    {
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
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
        allowNull: false,
      },
    },
    { timestamps: false }
  ),
  Products: sequelize.define(
    "products",
    {
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      img: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
    },
    { timestamps: false }
  ),
  Orders: sequelize.define("orders", {
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      default: false,
    },
    comment: {
      type: Sequelize.STRING,
      default: false,
    },
  }),
};
