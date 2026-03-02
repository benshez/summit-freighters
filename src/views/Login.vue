<template>
  <div class="flex min-h-full flex-1 flex-col px-6 py-8 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <FormBody>
        <template v-slot:header>
          <LoginProviders :message="'Sign in with'" :heading="'Welcome Back!'" />
        </template>
        <template v-slot:content></template>
        <template v-slot:footer="elements">
          <div class="mb-6 text-center">
            <div class="mt-6">
              <button type="button" @click="Login(elements.elements)"
                class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Sign In
              </button>
            </div>
          </div>
          <hr class="mb-6 border-slate-700" />
          <div class="text-center">
            <router-link to="/register">
              <a class="inline-block text-sm text-indigo-400 align-baseline hover:text-indigo-300">
                Create an Account!
              </a>
            </router-link>
          </div>
        </template>
      </FormBody>
    </div>
  </div>
</template>
<script setup lang="ts">
import FormBody from "@/components/Form/FormBody.vue";
import LoginProviders from "@/components/LoginProviders/LoginProviders.vue";
import type { IElement } from "@/interfaces";

const Login = (args: Array<IElement>) => {
  let email: string = "";
  let password: string = "";

  args.forEach((element: IElement) => {
    switch (element.id) {
      case "email":
        email = element.isValid ? element.value : "";
        break;
      case "password":
        password = element.isValid ? element.value : "";
        break;
    }
  })

  if (email !== "" && password !== "") {
    alert("yeah bruh!")
  } else {
    alert("invalid bruh!")
  }
  // isLoading.value = true;
  // if (email.value && password.value) {
  //   await authStore.LoginUser(email.value, password.value);
  //   isLoading.value = false;
  //   router.push("/edit");
  // }
}

</script>