<template>
  <div class="main">
    <ControlPane />
    <Map />
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'
import ControlPane from '@/components/ControlPane.vue'

export default {
  name: 'Home',
  components: {
    Map,
    ControlPane,
  }
}
</script>
