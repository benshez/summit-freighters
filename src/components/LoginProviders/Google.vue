<template>
  <div class="google-button">
    <button type="button" @click="googleAuth"
      class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">
      Google
    </button>
  </div>
</template>
<script setup lang="ts">
import { auth } from "@/utilities";

const googleAuth = async () => {

}

</script>