<template>
  <!-- Container -->
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <!-- Row -->
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- Col -->
      <div class="sm:mx-auto sm:w-full sm:max-w-sm" style="
              background-image: url('https://source.unsplash.com/HOkjo9_NcN4/600x800');
            "></div>
      <!-- Col -->
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h3 class="pt-4 text-2xl text-center text-slate-100">Welcome Back!</h3>
        <div class="p-5">
          <h3 class="text-center mb-2 font-semibold text-slate-200">Sign in with</h3>
          <div class="grid grid-cols-2 gap-1">
            <Google />
            <GitHub />
          </div>
        </div>
        <h3 class="text-center font-semibold text-slate-200">Or</h3>
        <form @submit.prevent="Login" class="px-8 pt-6 pb-8 mb-4 bg-slate-800 rounded">
          <div class="mb-4">
            <label class="block text-sm/6 font-medium" for="username">
              Email
            </label>
            <input
              class="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="username" type="text" required v-model.trim="email" placeholder="Enter your username/email" />
          </div>
          <div class="mb-4">
            <label class="block text-sm/6 font-medium" for="password">
              Password
            </label>
            <input
              class="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password" type="password" required v-model.trim="password" placeholder="Enter your password" />
          </div>

          <div class="mb-6 text-center">
            <div class="mt-6">
              <button
                class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                type="submit">
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
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import Google from "@/components/LoginProviders/Google.vue";
import GitHub from "@/components/LoginProviders/GitHub.vue";
import Loading from '@/components/Loading.vue';
import { authStore } from "@/store";
import { ref } from "vue";

const email = ref(null);
const password = ref(null);
const isLoading = ref(false);
const router = useRouter()

const Login = async () => {
  isLoading.value = true;
  if (email.value && password.value) {
    await authStore.LoginUser(email.value, password.value);
    isLoading.value = false;
    router.push("/edit");
  }
}

</script>