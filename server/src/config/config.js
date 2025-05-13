require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: "@July2000",
    database: "coffee_shop",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "@July2000",
    database: "coffee_shop",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "neondb_owner",
    password: "npg_fmb0IFq7SNXV",
    database: "neondb",
    host: "ep-bitter-tree-a1nfhq7g-pooler.ap-southeast-1.aws.neon.tech",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
