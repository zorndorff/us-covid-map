<template>
  <path
    :d="county.d"
    inkscape:connector-curvature="0"
    style="stroke:#000000;"
    class="county"
    v-bind:class="countyClass"
  >
    <title>{{county.title}} - {{infections}} : {{deaths}}</title>
  </path>
</template>

<script>
// eslint-disable-next-line no-undef
const keyRegex = new RegExp(/\s|,/gi);

export default {
  name: 'County',
  props: {
    county: Object
  },
  computed: {
    ID: function () {
      return this.county.title.replace(keyRegex, '').toLowerCase();
    },
    deaths: function () {
      return this.$store.getters.getDeathsById(this.ID);
    },
    infections: function () {
      return this.$store.getters.getInfectionsById(this.ID);
    },
    countyClass: function () {
      return (this.deaths)? "deaths" : (this.infections) ? "infected" : "";
    },
  },
  methods: {} 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 path { transition: fill 1.5s ease; }
 .county {
   fill: #fff;
 }
 .county.infected {
   fill: yellow;
 }
 .county.deaths {
   fill: red;
 }
</style>
