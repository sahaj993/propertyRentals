const express = require('express');
const Router = express.Router();

const homeController = require('../controller/main_controller')

Router.get('/', homeController.home);
Router.post('/register', homeController.create);
Router.post('/login', homeController.createSession);

module.exports = Router;