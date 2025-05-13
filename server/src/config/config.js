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
    use_env_variable: "NEON_DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
