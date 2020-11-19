const express = require('express');
const Router = express.Router();

const homeController = require('../controller/main_controller')

Router.get('/', homeController.home);

module.exports = Router;