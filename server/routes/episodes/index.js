const episodes = require('express').Router();
const all = require('./all');
const season = require('./season');

episodes.get('/', all);
episodes.get('/:season', season);

module.exports = episodes;
