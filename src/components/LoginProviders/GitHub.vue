<template>
  <button @click="githubAuth" type="button"
    class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">
    Github
  </button>
</template>
<script setup lang="ts">
import { auth } from "@/utilities";

const githubAuth = async () => {

}

</script>