<template>
  <div class="flex flex-col lg:flex-row gap-4 px-2 py-8 lg:px-4">
    <!-- Left Column - Profile Picture & Navigation -->
    <div class="lg:w-1/3">
      <!-- Profile Picture Section -->
      <div class="bg-white shadow-sm p-6 mb-4">
        <div class="flex flex-col items-center">
          <div class="relative profile-pic-upload mb-4">
            <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img id="profileImage"
                :src="currentUser.photoURL"
                alt="Profile" class="w-full h-full object-cover">
            </div>
            <div
              class="upload-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 transition-opacity duration-300 cursor-pointer">
              <label for="fileInput" class="text-white cursor-pointer">
                <i class="fas fa-camera text-xl"></i>
              </label>
              <input type="file" id="fileInput" class="hidden" accept="image/*">
            </div>
          </div>
          <h2 class="text-xl font-semibold text-gray-800">
            {{ currentUser.displayName }}
          </h2>
          <p class="text-gray-500 text-sm">Software Developer</p>

          <button id="changePhotoBtn"
            class="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
            Change Photo
          </button>
        </div>
      </div>

    </div>

    <!-- Right Column - Form -->
    <div class="lg:w-2/3">
      <div class="bg-white shadow-sm p-6">
        <FormBody>
          <template v-slot:header>
            Personal Information
          </template>
          <template v-slot:content></template>
          <template v-slot:footer="elements">
            <div class="mb-6 text-center">
              <div class="mt-6">
                <button type="button" @click="saveProfile(elements.elements)"
                  class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Save Changes
                </button>
              </div>
            </div>
            <hr class="mb-6 border-b" />
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import FormBody from "@/components/Form/FormBody.vue";;
import { useFirebase } from "@/utilities/firebase/useFirebase";
import { useFormStore } from "@/store/forms/formStore";

const formStore = useFormStore();
const currentUser = ref({
  photoURL: "",
  displayName: ""
});
  
const saveProfile = (e: any) => {
  // Send profile data to server
  console.log("Saving profile:", e)
  // Show success message
}

onMounted(async () => {
  const user = await useFirebase().getCurrentUser();
  formStore.updateElementState("email", { key: "value", value: user?.email });
  formStore.updateElementState("name", { key: "value", value: user?.displayName });
  currentUser.value = {
    photoURL: user?.photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    displayName: user?.displayName || ""
  };
})

</script>