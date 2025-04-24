"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM "Categories";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    let productsDummy = [];

    for (let i = 0; i < 50; i++) {
      productsDummy.push({
        name: faker.lorem.sentence(2),
        categoryId: faker.helpers.arrayElement(categories).id,
        price: faker.number.bigInt({
          min: 15000,
          max: 55000,
        }),
        stock: faker.number.int(50),
        image_cover: `https://placehold.co/${faker.number.int({
          min: 400,
          max: 800,
        })}x${faker.number.int({ min: 400, max: 800 })}`,
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      });
    }
    await queryInterface.bulkInsert("Products", productsDummy, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Products", null, {});
  },
};
