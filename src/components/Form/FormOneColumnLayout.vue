<template>
  <FormLayout>
    <template v-slot:form>
      <div class="overflow-hidden rounded-1xl border px-5 p-5 col-span-6">
        <slot name="form-body"></slot>
      </div>
    </template>
  </FormLayout>
</template>
<script setup lang="ts">
import FormLayout from "@/components/Form/FormLayout.vue";
</script>