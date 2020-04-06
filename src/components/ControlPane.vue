<template>
  <div class = "controls">
    <button @click="play">Play</button>
    <button @click="pause">Pause</button>
    <span>{{currentDate}}</span>
    <span>{{messages}}</span>
  </div>
</template>

<script>
import DataWorker from "worker-loader!../lib/data.worker.js";
    
export default {
  name: "ControlPane",
  data: () => ({
    county: "none",
    messages: [],
    currentDate: "",
  }),
  created: function () {
    this.dataWorker = new DataWorker();

    this.dataWorker.addEventListener("message", ({ data }) => {
      if(this[data.command]){
        this[data.command](data);
      }
    });
  },
  beforeDestroy: function () {
    this.dataWorker.terminate();
  },
  methods: {
    UPDATE_DATA: function({data}) {
      data.forEach(countyData => {
        const {cases, deaths, countyName} = countyData;
        
        if(parseInt(cases) !== 0){
          this.setInfections(countyName);
        }
        if (parseInt(deaths) !== 0) {
          this.setDeaths(countyName);
        }
      });
    },
    UPDATE_DATE: function({date}) {
      this.currentDate = date;
    },
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
    },
    pause: function() {
      this.dataWorker.postMessage({
        command: "PAUSE"
      });
    }

  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
