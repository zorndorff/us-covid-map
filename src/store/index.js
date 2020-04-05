import Vue from 'vue'
import Vuex from 'vuex'
import Counties from '@/assets/usa_county_list.json';

const countyData = {};
const keyRegex = new RegExp(/\s|,/gi);

for (const county of Counties){
  const id = county.title.replace(keyRegex, '').toLowerCase();
  countyData[id] = false;
}

const infections = {};
const deaths = {};

Object.assign(infections, countyData);
Object.assign(deaths, countyData);

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    infections,
    deaths
  },
  modules: {
  },
  mutations: {
    has_infected (state, id) {
      state.infections[id] = true;
    },
    has_deaths (state, id) {
      state.deaths[id] = true;
    }
  },
  actions: {
    increment (context, payload) {
      context.commit('increment', payload);
    },
    async set_deaths ({commit, state}, {id}) {
      if(!state.deaths[id]){
        commit('has_deaths', id);
      }
    },
    async set_infected ({commit, state}, {id}) {
      if(!state.infections[id]){
        commit('has_infected', id);
      }
    },
    async init (context, countyData){
      context.commit('init', countyData);
    }
  },
  getters: {}
})
