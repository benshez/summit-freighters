<template>
  <div v-if="options && options?.pages">
    <div
      v-for="(element, elementIndex) in findCurrentPageElements(options?.pages as Array<IPage>, route.name as string).elements"
      :key="elementIndex">
      <component :is="comp(element)" :element="element" v-if="isVisible(element)" v-model="element.value" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { inject } from "vue";
import { useRoute } from "vue-router";
import FormInput from "@components/Form/FormInput.vue";
import { useFormBuilderComponent } from "@/components/Form/useFormBuilderComponent";
import type { IElement, IPage, IWidgetOptions } from "@/interfaces";

const emitter = defineEmits(["input", "validate"]);
const { handleValidate, isVisible, findCurrentPageElements } = useFormBuilderComponent();
const route = useRoute();
const options = inject("options") as IWidgetOptions;

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