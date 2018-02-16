const data = require('../../data.json');

module.exports = (req, res) => {
  const seasonNumber = Number(req.params.season);
  const allEpisodes = data._embedded.episodes;
  const filteredEpisodes = allEpisodes.filter(episode => episode.season === seasonNumber);
  res.status(200).json({ filteredEpisodes });
};
