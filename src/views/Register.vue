<template>
  <FormOneColumnLayout>
    <template v-slot:form-body>
      <FormBody>
        <template v-slot:header>
          <LoginProviders :message="'Sign in with'" :heading="'Welcome Back!'" />
        </template>
        <template v-slot:content></template>
        <template v-slot:footer="elements">
          <div class="mb-6 text-center">
            <div class="mt-6">
              <button type="button" @click="Register(elements.elements)"
                class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Register Account
              </button>
            </div>
          </div>
          <hr class="mb-6 border-b" />
          <div class="text-center">
            <router-link to="/login"><a
                class="inline-block text-sm text-indigo-400 align-baseline hover:text-indigo-300">
                Already have an account? Login
              </a></router-link>
          </div>
        </template>
      </FormBody>
    </template>
  </FormOneColumnLayout>
</template>

<script setup lang="ts">
import FormBody from "@/components/Form/FormBody.vue";
import LoginProviders from "@/components/LoginProviders/LoginProviders.vue";
import FormOneColumnLayout from "@/components/Form/FormOneColumnLayout.vue";
import type { IElement } from "@/interfaces";
import { useAuthStore } from "@/store/auth/authStore";

const authStore = useAuthStore();

const Register = async (args: Array<IElement>) => {
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
    try {
      await authStore.CreateUser(email, password);
      await authStore.SendVerificationEmail();
    } catch (e) {
      alert(e)
    }
  }
}

</script>