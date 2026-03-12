<template>
  <FormTwoColumnLayout :is-left-layout="false">
    <template v-slot:form-body-left>
      <div ref="mapContainer" class="map-container"></div>
    </template>
    <template v-slot:form-body-right>
      <div class="flex flex-col items-center">
        <FormBody>
          <template v-slot:header>
            Personal Information
          </template>
          <template v-slot:content></template>
          <template v-slot:footer="elements">
            <div class="mb-6 text-center">
              <div class="mt-6">
                <button type="button" @click="saveTrip(elements.elements)"
                  class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Save Changes
                </button>
              </div>
            </div>
          </template>
        </FormBody>
      </div>
    </template>
  </FormTwoColumnLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import mapboxgl, { type LngLatLike } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { lineString } from "@turf/turf";
import FormTwoColumnLayout from "@/components/Form/FormTwoColumnLayout.vue";
import FormBody from "@/components/Form/FormBody.vue";
import { configuration } from "@/utilities";
import { mapboxSearch } from "@/api";
import type { MapboxDirections } from "@/interfaces";
import { useFormStore } from "@/store/forms/formStore";

const formStore = useFormStore();
const layerId: string = "standard";
const mapContainer = ref<HTMLElement | null>(null);
let mapbox: unknown;
let map: mapboxgl.Map;

const GetGeolocation = (): LngLatLike => {
  let latitude = -29.85260156155084;
  let longitude = 31.009960218027402;

  if (navigator.geolocation) {
    navigator
      .geolocation
      .getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      }, (e) => {
        return [longitude, latitude];
      }, {
        timeout: 50000,
        enableHighAccuracy: true
      });
  }

  return [longitude, latitude];
}
const MapboxInit = () => {
  if (mapbox) return;

  mapboxgl.accessToken = configuration.GetMapboxToken();
  mapbox = mapboxgl;
  map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: `mapbox://styles/mapbox/${layerId}`,
    center: GetGeolocation(),
    zoom: 12,
    scrollZoom: false,
    boxZoom: true,
    doubleClickZoom: false
  });

  AddMapboxDrawControl();
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
    formStore.updateElementState("distance", { key: "value", value: `${travelDistance.toFixed(2)}km` });
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

const saveTrip = (event: any) => {

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
