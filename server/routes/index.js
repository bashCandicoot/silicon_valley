const routes = require('express').Router();
const episodes = require('./episodes');

routes.use('/', episodes);

module.exports = routes;
