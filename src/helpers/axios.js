const axios = require("axios");

const hitAPI = axios.create({
  baseURL: "https://tcg-ecommerce-cms.herokuapp.com"
});

// https://tcg-ecommerce-cms.herokuapp.com/ <--- heroku server
// http://localhost:3000 <--- localhost server

module.exports = {
  hitAPI
};
