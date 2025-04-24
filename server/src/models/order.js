"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Product, Order_Item }) {
      this.belongsTo(User, { foreignKey: "userId" });
      this.hasMany(Order_Item, { foreignKey: "orderId" });
      this.belongsToMany(Product, {
        through: Order_Item,
        foreignKey: "orderId",
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.UUID,
      status: DataTypes.STRING,
      total_amount: DataTypes.BIGINT,
      token: DataTypes.STRING,
      midtransOrderId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
