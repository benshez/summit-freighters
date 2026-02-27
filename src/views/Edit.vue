<template>
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left Column - Profile Picture & Navigation -->
      <div class="lg:w-1/3">
        <!-- Profile Picture Section -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-4">
          <div class="flex flex-col items-center">
            <div class="relative profile-pic-upload mb-4">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img id="profileImage"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
            <h2 class="text-xl font-semibold text-gray-800">John Doe</h2>
            <p class="text-gray-500 text-sm">Software Developer</p>

            <button id="changePhotoBtn"
              class="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
              Change Photo
            </button>
          </div>
        </div>

        <!-- Navigation -->
        <div class="bg-white rounded-xl shadow-sm p-4">
          <nav class="space-y-1">
            <a href="#" class="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium">
              <i class="fas fa-user-circle mr-3"></i>
              Personal Info
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <i class="fas fa-lock mr-3"></i>
              Security
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <i class="fas fa-bell mr-3"></i>
              Notifications
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <i class="fas fa-globe mr-3"></i>
              Preferences
            </a>
          </nav>
        </div>
      </div>

      <!-- Right Column - Form -->
      <div class="lg:w-2/3">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>

          <form id="profileForm">
            <!-- Name Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label for="firstName" class="block text-sm/6 font-medium">First Name</label>
                <input type="text" id="firstName"
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  value="John" required>
              </div>
              <div>
                <label for="lastName" class="block text-sm/6 font-medium">Last Name</label>
                <input type="text" id="lastName"
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  value="Doe" required>
              </div>
            </div>

            <!-- Email & Phone -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label for="email" class="block text-sm/6 font-medium">Email Address</label>
                <input type="email" id="email"
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  value="john.doe@example.com" required>
              </div>
              <div>
                <label for="phone" class="block text-sm/6 font-medium">Phone Number</label>
                <input type="tel" id="phone"
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  value="+1 (555) 123-4567">
              </div>
            </div>

            <!-- Location -->
            <div class="mb-4">
              <label for="location" class="block text-sm/6 font-medium">Location</label>
              <input type="text" id="location"
                class="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                value="San Francisco, CA">
            </div>

            <!-- Bio -->
            <div class="mb-4">
              <label for="bio" class="block text-sm/6 font-medium">Bio</label>
              <textarea id="bio" rows="4"
                class="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline resize-none">Passionate software developer with 5+ years of experience building web applications. Love working with Vue.js and Tailwind CSS.</textarea>
              <p class="text-gray-500 text-sm mt-2">Brief description for your profile.</p>
            </div>

            <!-- Job Title & Company -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label for="jobTitle" class="block text-sm/6 font-medium">Job Title</label>
                <input type="text" id="jobTitle"
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  value="Software Developer">
              </div>
              <div>
                <label for="company" class="block text-sm/6 font-medium">Company</label>
                <input type="text" id="company"
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  value="TechCorp Inc.">
              </div>
            </div>

            <!-- Social Links -->
            <div class="mb-8">
              <h3 class="text-lg font-medium text-gray-800 mb-4">Social Links</h3>
              <div class="space-y-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg mr-3">
                    <i class="fab fa-twitter"></i>
                  </div>
                  <input type="text" placeholder="Twitter URL"
                    class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value="https://twitter.com/johndoe">
                </div>
                <div class="flex items-center">
                  <div class="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg mr-3">
                    <i class="fab fa-linkedin-in"></i>
                  </div>
                  <input type="text" placeholder="LinkedIn URL"
                    class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value="https://linkedin.com/in/johndoe">
                </div>
                <div class="flex items-center">
                  <div class="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-lg mr-3">
                    <i class="fab fa-github"></i>
                  </div>
                  <input type="text" placeholder="GitHub URL"
                    class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value="https://github.com/johndoe">
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
              <button type="button" id="cancelBtn"
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <!-- Delete Account Section -->
        <div class="bg-white rounded-xl shadow-sm p-6 mt-6 border border-red-100">
          <h3 class="text-lg font-medium text-red-700 mb-2">Delete Account</h3>
          <p class="text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button type="button" id="deleteAccountBtn"
            class="px-4 py-2 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'

// Reactive state
const profile = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  bio: 'Passionate software developer...',
  jobTitle: 'Software Developer',
  company: 'TechCorp Inc.',
  social: {
    twitter: 'https://twitter.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe'
  }
})

const profileImage = ref('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')

// Methods
const handleImageUpload = (event: any) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      //profileImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveProfile = () => {
  // Send profile data to server
  console.log('Saving profile:', profile.value)
  // Show success message
}

const deleteAccount = () => {
  if (confirm('Are you sure you want to delete your account?')) {
    // Delete account logic
  }
}
</script>