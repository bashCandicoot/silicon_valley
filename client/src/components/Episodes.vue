<template>
  <div>
    <h1>Silicon Valley</h1>
    <input type="text" name="search" v-model="search" placeholder="Title">

    <select v-model="selectedSeason">
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
      allEpisodes: null,
      selectedSeason: 1,
      numberOfSeasons: null,
      search: null,
    };
  },
  mounted() {
    this.getEpisodes();
  },
  computed: {
    filteredEpisodes() {
      if (!this.search) {
        return this.allEpisodes;
      }
      return this.filterEpisodeByName();
    },
  },
  methods: {
    async getEpisodes() {
      const response = await EpisodesService.getAllSiliconValleyEpisodes();
      this.allEpisodes = response.data.allEpisodes;
      this.getNumberOfSeasons();
    },
    getNumberOfSeasons() {
      this.numberOfSeasons = this.allEpisodes[this.allEpisodes.length - 1].season;
    },
    filterEpisodeByName() {
      return this.allEpisodes.filter((episode) => {
        return episode.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>
