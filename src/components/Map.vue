<template>
  <div class="map">
    <svg
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    width="60%"
    viewBox="0 0 989 627"
    height="80vh"
    version="1.0"
    id="svg2"
    inkscape:version="0.91 r13725"
    sodipodi:docname="USA counties.svg">
    <metadata
      id="metadata4">
      <rdf:RDF>
        <cc:Work>
          <dc:format>image/svg+xml</dc:format>
          <dc:type
            rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
          <dc:title></dc:title>
          <cc:license
            rdf:resource="http://creativecommons.org/publicdomain/zero/1.0/" />
          <dc:date>2019-10-06</dc:date>
          <dc:creator>
            <cc:Agent>
              <dc:title>U.S. Census Bureau, Abe.suleiman, Lokal_Profil</dc:title>
            </cc:Agent>
          </dc:creator>
          <dc:source>https://commons.wikimedia.org/wiki/File:Usa_counties_large.svg</dc:source>
        </cc:Work>
        <cc:License
          rdf:about="http://creativecommons.org/publicdomain/zero/1.0/">
          <cc:permits
            rdf:resource="http://creativecommons.org/ns#Reproduction" />
          <cc:permits
            rdf:resource="http://creativecommons.org/ns#Distribution" />
          <cc:permits
            rdf:resource="http://creativecommons.org/ns#DerivativeWorks" />
        </cc:License>
      </rdf:RDF>
    </metadata>
    <g
      id="counties"
      transform="translate(0,0.10698)"
      style="fill:#d0d0d0;stroke:#ffffff;stroke-width:0.17828999"
    >
      <County v-for="county in counties" :key="county.title" v-bind:county="county"></County>
    </g> 
    </svg>
  </div>
</template>

<script>
import County from '@/components/County.vue';
import Counties from '@/assets/usa_county_list.json';


export default {
  name: 'Map',
  data: () => ({
    counties: Counties,
    dataLoaded: false
  }),
  methods: {},
  props: {},
  components: {
    County
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #counties {fill:#d0d0d0;stroke:#000;stroke-width:.17829;} 
  #borders {fill:none;stroke:#221e1f;stroke-width:.89143;} 
  #separator {fill:none;stroke:#a9a9a9;stroke-width:2.3177309;}
</style>
