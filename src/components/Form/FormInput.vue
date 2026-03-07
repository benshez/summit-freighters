<template>
  <FormElement :element="element">
    <template v-slot:label></template>
    <template v-slot:component>
      <div class="relative mt-1">
        <input v-if="!element.isReadonly" v-model="element.value" :id="element.id" :name="element.id"
          :type="element.type" :class="element.cssClass" :placeholder="element.placeholderText"
          @input="handleInput(element.id as string)" />
        <svg class="absolute w-4 h-4 top-2.5 right-2.5 text-slate-600" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" :d="element.labelIcon" />
        </svg>
      </div>
    </template>
    <template v-slot:help>
      
    </template>
  </FormElement>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ElementProps } from "@/components/Form/props/Props";
import FormElement from "@/components/Form/FromElement.vue";
import { useFormStore } from "@/store";

const route = useRoute();
const props = defineProps({
  ...ElementProps
});

const formStore = useFormStore();

const { handleInput } = useFormStore();
</script>