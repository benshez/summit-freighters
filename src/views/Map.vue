<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { distance, lineString } from "@turf/turf";
import { configuration } from "@/utilities";

let mapbox: unknown;
let map: mapboxgl.Map
const mapContainer = ref<HTMLElement | null>(null);

const MapboxInit = () => {
  if (mapbox) return;

  mapboxgl.accessToken = configuration.GetMapboxToken();
  mapbox = mapboxgl;
}



onMounted(async () => {

  // const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/-122.42,37.78;-77.03,38.91?access_token=${configuration.GetMapboxToken()}`;
  // try {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log(data);
  //   // Handle route data (e.g., display on map)
  // } catch (error) {
  //   console.error('Error fetching route:', error);
  // }

  //"https://api.mapbox.com/directions/v5/mapbox/cycling/-122.42,37.78;-77.03,38.91?access_token=YOUR_MAPBOX_ACCESS_TOKEN"


  MapboxInit();

  map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [103.811279, 1.345399],
    zoom: 12
  });

  const draw = new MapboxDraw({
    keybindings: true,           // Enable keyboard shortcuts
    boxSelect: true,             // Enable shift+click to select features
    clickBuffer: 2,              // Pixels around click to register feature
    touchEnabled: true,          // Enable touch interactions
    touchBuffer: 25,             // Pixels around touch to register feature
    displayControlsDefault: true,// Show default control buttons
    userProperties: false,
    controls: { line_string: true, trash: true },
    defaultMode: "simple_select"
  });

  map.addControl(draw);
  map.addControl(new mapboxgl.NavigationControl());

  map.on("draw.create", async (e) => {
    const drawData = draw.getAll();
    if (drawData.features.length > 0) {
      const coords = drawData.features[0].geometry.coordinates;

      const start = coords[0];
      const end = coords[1];
      const profile = "driving"

      const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${start};${end}?steps=true&geometries=geojson&access_token=${configuration.GetMapboxToken()}`;
      try {
        const response = await fetch(url);
        const dt = await response.json();
        const waypoints: any = [];
        dt.routes[0].geometry.coordinates.forEach((wp: any) => { waypoints.push(wp) })
        const distance = dt.routes[0].distance
        const _linestring = lineString(waypoints)


        map.addSource('route', {
          type: 'geojson',
          data: _linestring
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#888',
            'line-width': 8
          }
        });
        // Handle route data (e.g., display on map)
      } catch (error) {
        console.error('Error fetching route:', error);
      }

      console.log(coords)
      //const dist = distance(coords[0], coords[coords.length - 1], { units: "kilometers" });
      //alert(`Distance: ${dist.toFixed(2)} km`);
    }
  });
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
}
</style>
