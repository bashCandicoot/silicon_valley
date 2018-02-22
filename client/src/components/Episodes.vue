<template>
  <div>
    <h1>Silicon Valley</h1>
    <input type="text" name="search" v-model="search" placeholder="Title">

    <select v-model="selectedSeason" @change="getEpisodesBySeason">
      <option>All</option>
      <option v-for="season in numberOfSeasons" v-bind:key="season">
        {{ season }}
      </option>
    </select>

    <div v-for="episode in filteredEpisodes" v-bind:key="episode.id" class="grid-container">
      <div class="grid-item">{{ episode.name }}</div>
    </div>

  </div>
</template>

<script>
import EpisodesService from '@/services/EpisodesService';
import '../../styles/episodes.css';

export default {
  data() {
    return {
      episodes: null,
      selectedSeason: 'All',
      numberOfSeasons: null,
      search: null,
    };
  },
  mounted() {
    this.getAllEpisodes();
  },
  computed: {
    filteredEpisodes() {
      if (!this.search) {
        return this.episodes;
      }
      return this.filterEpisodeByName();
    },
  },
  methods: {
    async getAllEpisodes() {
      const response = await EpisodesService.getAllSiliconValleyEpisodes();
      this.episodes = response.data.allEpisodes;
      this.getNumberOfSeasons();
    },
    getNumberOfSeasons() {
      this.numberOfSeasons = this.episodes[this.episodes.length - 1].season;
    },
    filterEpisodeByName() {
      return this.episodes.filter((episode) => {
        return episode.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    async getEpisodesBySeason() {
      if (this.selectedSeason === 'All') {
        return this.getAllEpisodes()
      }
      const response = await EpisodesService.getSiliconValleyEpisodesBySeason(this.selectedSeason);
      this.episodes = response.data.filteredEpisodes;
    }
  },
};
</script>
