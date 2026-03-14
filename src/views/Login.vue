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
              <button type="button" @click="Login(elements.elements)"
                class="flex w-full justify-center border p-2 rounded">
                Sign In
              </button>
            </div>
          </div>
          <hr class="mb-6" />
          <div class="text-center">
            <router-link to="/register">
              <a class="flex w-full justify-center border p-2 rounded">
                Create an Account!
              </a>
            </router-link>
          </div>
        </template>
      </FormBody>
    </template>
  </FormOneColumnLayout>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import FormBody from "@/components/Form/FormBody.vue";
import LoginProviders from "@/components/LoginProviders/LoginProviders.vue";
import FormOneColumnLayout from "@/components/Form/FormOneColumnLayout.vue";
import type { IElement } from "@/interfaces";
import { useUserStore } from "@/store";

const router = useRouter();
const autStore = useUserStore();
const Login = async (args: Array<IElement>) => {
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
    await autStore.LoginUser(email, password);
    const user = await autStore.GetCurrentUser();

    if (user && user.emailVerified) router.push("/edit");
  }
}

</script>