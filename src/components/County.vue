<template>
  <path
    :d="county.d"
    inkscape:connector-curvature="0"
    style="stroke:#000000;"
    class="county"
    v-bind:class="countyClass"
  >
    <title>{{county.title}} {{deaths}} {{infections}}</title>
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
    infections: function () {
      return this.$store.state.infections[this.ID];
    },
    deaths: function () {
      return this.$store.state.deaths[this.ID];
    }, 
    countyClass: function () {
      const classes = [];
      
      if (this.infections === true) {
        classes.push("infected");
      }
      if (this.deaths === true) {
        classes.push("deaths");
      }
      return classes;
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
