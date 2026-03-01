<template>
  <div v-if="elements && elements?.length > 0">
    <div v-for="(element, elementIndex) in elements" :key="elementIndex">
      <component :is="comp(element)" :element="element" v-if="handleDisplay(element)" v-model="element.value" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import FormInput from "@components/Form/FormInput.vue";
import { useFormBuilderComponent } from "@/components/Form/useFormBuilderComponent";
import type { IElement } from "@/interfaces";

const props = defineProps({
  elements: Array<IElement>
});

const emitter = defineEmits(["input", "validate"]);
const { handleValidate, handleDisplay } = useFormBuilderComponent();
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