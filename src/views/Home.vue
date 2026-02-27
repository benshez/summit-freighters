<template>
  <div class="home">
    <Header />
    Home
    <div class="container">sdfsdf</div>
    <div v-if="options.userInfo">
      {{ options.userInfo?.accessToken }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import Header from "@/components/Header.vue";
import { api } from "@/plugins/index";
import { authStore } from "@/store/auth/authStore";
import type { IWidgetOptions } from "@/interfaces";

const options = inject("options") as IWidgetOptions
//const user = useAuthStore();

const testMsg = 'WTF'
const clicked = async () => {


  await authStore.GetUserInfo(options.userInfo?.uid || "");

  api.defaults.headers.get.Authorization = "";
}
</script>
