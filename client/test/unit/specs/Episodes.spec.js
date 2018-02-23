import Vue from 'vue';
import Episodes from '@/components/Episodes';

describe('Episodes.vue', () => {
  it('should render correct header', () => {
    const EpisodeComponent = Vue.extend(Episodes);
    const vm = new EpisodeComponent().$mount();
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('Silicon Valley');
  });
});

describe('Episodes.vue', () => {
  it('should render all episodes', () => {
    const EpisodeComponent = Vue.extend(Episodes);
    const vm = new EpisodeComponent().$mount();
    vm.getAllEpisodes();
    const numberOfEpisodes = vm.$el.querySelectorAll('.grid-item').length;
    expect(numberOfEpisodes).to.equal(38);
  });
});
