import Api from '@/services/Api';

export default {
  getAllSiliconValleyEpisodes() {
    return Api().get('silicon-valley');
  },
  getSiliconValleyEpisodesBySeason(seasonNumber) {
    return Api().get(`silicon-valley/season/${seasonNumber}`);
  },
};
