<template>
  <FormLayout>
    <template v-slot:form>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm bg-white shadow-sm lg:p-6 p-1">
        <slot name="form-body"></slot>
      </div>
    </template>
  </FormLayout>
</template>
<script setup lang="ts">
import FormLayout from "@/components/Form/FormLayout.vue";
</script>