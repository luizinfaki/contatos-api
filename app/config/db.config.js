require('dotenv').config;

module.exports = {
  url: process.env.DATABASE_CONNECTION_STRING || null
};