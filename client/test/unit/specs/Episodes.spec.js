import Vue from 'vue';
import Episodes from '@/components/Episodes';

describe('Episodes.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Episodes);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('Silicon Valley');
  });
});
