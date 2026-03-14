<template>
  <FormTwoColumnLayout>
    <template v-slot:form-body-left>
      <div class="flex flex-col items-center">
        <div class="relative profile-pic-upload mb-4">
          <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow">
            <img id="profileImage" :src="currentUser.photoURL" alt="Profile" class="w-full h-full object-cover">
          </div>
          <div
            class="upload-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 transition-opacity duration-300 cursor-pointer">
            <label for="fileInput" class="text-white cursor-pointer">
              <i class="fas fa-camera text-xl"></i>
            </label>
            <input type="file" id="fileInput" class="hidden" accept="image/*">
          </div>
        </div>
        <h2>
          {{ currentUser.displayName }}
        </h2>
        <p class="text-sm mb-5">Software Developer</p>
        <button id="changePhotoBtn" class="flex w-full justify-center border p-2 rounded">
          Change Photo
        </button>
      </div>
    </template>

    <template v-slot:form-body-right>
      <FormBody>
        <template v-slot:header>
          Personal Information
        </template>
        <template v-slot:content></template>
        <template v-slot:footer="elements">
          <div class="mb-6 text-center">
            <div class="mt-6">
              <button type="button" @click="saveProfile(elements.elements)"
                class="flex w-full justify-center border p-2 rounded">
                Save Changes
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
  </FormTwoColumnLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import FormBody from "@/components/Form/FormBody.vue";
import FormTwoColumnLayout from "@/components/Form/FormTwoColumnLayout.vue";
import { useUserStore, useFormStore } from "@/store";
import type { IElement } from "@/interfaces";

const formStore = useFormStore();
const authStore = useUserStore();
const currentUser = ref({
  photoURL: "",
  displayName: ""
});

const saveProfile = (elements: Array<IElement>) => {
  // Send profile data to server
  console.log("Saving profile:", elements)
  // Show success message
}

onMounted(async () => {
  const user = await authStore.GetCurrentUser();
  formStore.updateElementState("email", { key: "value", value: user?.email });
  formStore.updateElementState("name", { key: "value", value: user?.displayName });
  currentUser.value = {
    photoURL: user?.photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    displayName: user?.displayName || ""
  };
})

</script>