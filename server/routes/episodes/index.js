const episodes = require('express').Router();
const all = require('./all');
const season = require('./season');

episodes.get('/silicon-valley', all);
episodes.get('/silicon-valley/season/:season', season);

module.exports = episodes;
