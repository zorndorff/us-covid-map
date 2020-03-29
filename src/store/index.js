import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultData = () => ({
  deaths: 0,
  infections: 0
});


export default new Vuex.Store({
  state: {
    data: {}
  },
  modules: {
  },
  mutations: {
    increment (state, payload) {
      state.data[payload.countyKey].deaths = payload.newTotal;
    },
    init (state, payload) {
      state.data[payload.countyKey] = defaultData();
    }
  },
  actions: {
    increment (context, payload) {
      context.commit('increment', payload)
    },
    init (context, payload){
      context.commit('init', payload);
    }
  },
  getters: {}
})
