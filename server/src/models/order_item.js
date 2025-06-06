"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Product }) {
      this.belongsTo(Order, { foreignKey: "orderId" });
      this.belongsTo(Product, { foreignKey: "productId" });
    }
  }
  Order_Item.init(
    {
      orderId: DataTypes.UUID,
      productId: DataTypes.UUID,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_Item",
    }
  );
  return Order_Item;
};
