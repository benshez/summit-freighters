<template>
  <div class="flex min-h-full flex-1 flex-col justify-center">
    <div class="flex flex-col lg:flex-row gap-8 px-6 py-8 lg:px-8">

      <div class="lg:w-1/3">
        <div class="bg-white shadow-sm p-6 mb-4">
          <div class="flex flex-col items-center">
            <p></p>
            {{ dist }}
          </div>
        </div>
      </div>
      <div class="lg:w-2/3">
        <div class="bg-white shadow-sm p-6">
          <div ref="mapContainer" class="map-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { distance, lineString } from "@turf/turf";
import { configuration } from "@/utilities";
import { mapboxSearch } from "@/api";
import type { MapboxDirections } from "@/interfaces";

const layerId: string = "standard";
const mapContainer = ref<HTMLElement | null>(null);
const dist = ref<string>("");
let mapbox: unknown;
let map: mapboxgl.Map;

const MapboxInit = () => {
  if (mapbox) return;

  if (navigator.geolocation) {
    mapboxgl.accessToken = configuration.GetMapboxToken();
    mapbox = mapboxgl;

    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      map = new mapboxgl.Map({
        container: mapContainer.value!,
        style: `mapbox://styles/mapbox/${layerId}`,
        center: [longitude, latitude],
        zoom: 12,
        scrollZoom: false,
        boxZoom: true,
        doubleClickZoom: false
      });

      AddMapboxDrawControl();
    });
  }
}

const GetWayPointsFromDirections = async (drawData: any) => {
  const firstFeature = drawData.features[0];
  const coordinates: Array<Array<number>> = firstFeature.geometry.coordinates as Array<Array<number>>;
  const directions: MapboxDirections = await mapboxSearch.GetDirections("driving", coordinates);
  const waypoints: Array<Array<number>> = [];
  const firstRoute = directions?.routes[0];

  firstRoute?.geometry.coordinates.forEach((waypoint: any) => {
    waypoints.push(waypoint);
  });

  if (firstRoute) {
    const travelDistance = (firstRoute.distance / 1000);
    dist.value = `${travelDistance.toFixed(2)}km`;
  }

  return waypoints;
}

const AddMapboxDrawControl = async () => {
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

  onDeleteDrawing(map, draw);

  onCreateDrawing(map, draw);

  map.addControl(draw);
}

const onCreateDrawing = (map: mapboxgl.Map, draw: MapboxDraw) => {
  map.on("draw.create", async (e) => {
    const drawData = draw.getAll();

    if (drawData.features.length > 0) {
      map.addSource("route", {
        type: "geojson",
        data: lineString(await GetWayPointsFromDirections(drawData))
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#888",
          "line-width": 8
        }
      });
    }
  })
}

const onDeleteDrawing = (map: mapboxgl.Map, draw: MapboxDraw) => {
  map.on("draw.delete", async (e) => {
    const data = draw.getAll();
    if (data.features.length === 0) {
      map.removeLayer("route");
      map.removeSource("route");
    }

    setTimeout(() => {
      draw.deleteAll();
    }, 0)
  })
}


onMounted(async () => {
  MapboxInit();
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
}
</style>
