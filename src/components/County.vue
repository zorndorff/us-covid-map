<template>
  <path
    :d="county.d"
    inkscape:connector-curvature="0"
    style="stroke:#000000;"
    class="county"
    v-bind:class="countyClass"
    @click="toggleClass"
  >
    <title>{{county.titke}} - {{data.deaths}}</title>
  </path>
</template>

<script>
// eslint-disable-next-line no-undef
const keyRegex = new RegExp(/\s|,/gi);

export default {
  name: 'County',
  props: {
    county: Object,
  },
  mounted: async function () {
    await this.$store.dispatch('init', {
      countyKey: this.countyKey
    });
  },
  data: function (){
    return {
      countyClass: ""
    };
  },
  computed: {
    countyKey: function () {
      return this.county.title.replace(keyRegex, '').toLowerCase();
    },
    data: function () {
      return this.$store.state.data[this.countyKey] || {
        deaths: 0
      };
    }
  },
  methods: {
    toggleClass: function() {
      this.countyClass = "test";
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 path { transition: fill 1.5s ease; }
 .county {
   fill: #fff;
 }
 .county.test {
   fill: #000;
 }
</style>
