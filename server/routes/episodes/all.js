const data = require('../../data.json');

module.exports = (req, res) => {
  const allEpisodes = data._embedded.episodes;
  res.status(200).json({ allEpisodes });
};
