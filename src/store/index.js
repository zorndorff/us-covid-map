import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {},
    infected: {},
    deaths: {}
  },
  modules: {
  },
  mutations: {
    increment (state, {id, newTotal}) {
      state.data[id].deaths = newTotal;
    },
    has_infected (state, id) {
      state.data[id].infections = true;
    },
    has_deaths (state, id) {
      state.data[id].deaths = true;
    },
    init (state, countyData) {
      state.data = countyData;
    }
  },
  actions: {
    increment (context, payload) {
      context.commit('increment', payload);
    },
    async set_deaths ({commit}, {id}) {
      commit('has_deaths', id);
    },
    async set_infected ({commit}, {id}) {
      commit('has_infected', id);
    },
    async init (context, countyData){
      context.commit('init', countyData);
    }
  },
  getters: {
    getDataById: ({ data }) => (id) => {
      return data[id];
    },
    getDeathsById: ({ data }) => (id) => {
      return data[id].deaths;
    },
    getInfectionsById: ({ data }) => (id) => {
      return data[id].infections;
    }
  }
})
