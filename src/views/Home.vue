<template>
  <div class="home">
    Home
    <div class="container">sdfsdf</div>
    <div v-if="options.userInfo">
      djhghjhjghjg
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import type { IWidgetOptions } from "@/interfaces";

const options = inject("options") as IWidgetOptions
//const user = useAuthStore();

const testMsg = 'WTF'
const clicked = async () => {

}
</script>
