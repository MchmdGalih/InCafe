"use strict";

const { hashPassword } = require("../utils/passwordService");

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

    const roles = await queryInterface.sequelize.query(
      `
      SELECT id, name FROM "Roles";`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const typeRole = {};
    roles.forEach((role) => {
      typeRole[role.name] = role.id;
    });

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@gmail.com",
          password: hashPassword("password"),
          roleId: typeRole["admin"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user",
          email: "user@gmail.com",
          password: hashPassword("password"),
          roleId: typeRole["user"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
