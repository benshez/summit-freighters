<template>
  <div class="flex min-h-full flex-1 flex-col px-6 py-8 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <FormBody>
        <template v-slot:header>
          <LoginProviders :message="'Sign in with'" :heading="'Welcome Back!'" />
        </template>
        <template v-slot:content></template>
        <template v-slot:footer>
          <div class="mb-6 text-center">
            <div class="mt-6">
              <button
                type="button"
                @click="Login"
                class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                Sign In
              </button>
              <div v-if="isLoading">
                <Loading class="m-3 font-extrabold text-center" />
              </div>
            </div>
          </div>
          <hr class="mb-6 border-slate-700" />
          <div class="text-center">
            <router-link to="/register"><a
                class="inline-block text-sm text-indigo-400 align-baseline hover:text-indigo-300">
                Create an Account!
              </a></router-link>
          </div>
        </template>
      </FormBody>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import FormBody from "@/components/Form/FormBody.vue";
import LoginProviders from "@/components/LoginProviders/LoginProviders.vue";

import Loading from '@/components/Loading.vue';
import { authStore } from "@/store";
import { ref } from "vue";


const emit = defineEmits(["save"])

const email = ref(null);
const password = ref(null);
const isLoading = ref(false);
const router = useRouter()

const Login = (event: Event) => {
  emit("save")
  // if (event) {
  //   event.preventDefault()
  // }
  // isLoading.value = true;
  // if (email.value && password.value) {
  //   await authStore.LoginUser(email.value, password.value);
  //   isLoading.value = false;
  //   router.push("/edit");
  // }
}

</script>