"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Categories, Order, Order_Item }) {
      this.belongsTo(Categories, { foreignKey: "categoryId" });
      this.belongsToMany(Order, {
        through: Order_Item,
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      categoryId: DataTypes.UUID,
      description: DataTypes.TEXT,
      price: DataTypes.BIGINT,
      stock: DataTypes.INTEGER,
      image_cover: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
