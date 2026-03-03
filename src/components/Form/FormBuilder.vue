<template>
  <div v-if="elements && elements?.length > 0">
    <div v-for="(element, elementIndex) in elements" :key="elementIndex">
      <component :is="comp(element)" :element="element" v-if="handleDisplay(element)" v-model="element.value" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import FormInput from "@components/Form/FormInput.vue";
import { usePageData } from "@/components/Form/data/usePageData";
import type { IElement } from "@/interfaces";

const props = defineProps({
  elements: Array<IElement>
});

const emitter = defineEmits(["input", "validate"]);
const { handleDisplay } = usePageData();
const route = useRoute();

const comp = (element: IElement): any => {
  let component = null;
  switch (element.component) {
    case "FormInput":
      component = FormInput;
      break;
  }

  return component;
}


</script>