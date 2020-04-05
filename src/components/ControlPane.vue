<template>
  <div class = "controls">
    <input type="text" v-model="county" />
    <button @click="setDeaths">DEATHS</button>
    <button @click="setInfections">Infections</button>
    <button @click="play">Play</button>
    <span>{{messages}}</span>
  </div>
</template>

<script>
import DataWorker from "worker-loader!../lib/data.worker.js";
// eslint-disable-next-line no-undef
const keyRegex = new RegExp(/\s|,/gi);

export default {
  name: "ControlPane",
  data: () => ({
    county: "none",
    messages: []
  }),
  mounted: function () {
    this.dataWorker = new DataWorker();
    this.dataWorker.addEventListener("message", ({ data }) => {
      if(data.state === "UPDATE"){
        const {infections, deaths} = data.data;

        infections.forEach((title) => {
          const id = title.replace(keyRegex, '').toLowerCase();
          this.setInfections(id);
        });
        deaths.forEach((title) => {
          const id = title.replace(keyRegex, '').toLowerCase();
          this.setDeaths(id);
        });
      }
    });
  },
  beforeDestroy: function () {
    this.dataWorker.terminate();
  },
  methods: {
    setDeaths: function(id) {
      this.$store.dispatch('set_deaths', {id});
    },
    setInfections: function(id) {
      this.$store.dispatch('set_infected', {id});
    },
    play: function() {
      this.dataWorker.postMessage({
        command: "PLAY"
      });
    }

  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
