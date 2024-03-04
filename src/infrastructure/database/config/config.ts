import { Options } from "sequelize";
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

export default {
  username: process.env.USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql',
  storage: './src/tests/database.sqlite',
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true
  }
} as Options;
  