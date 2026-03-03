<template>
  <FormElement :element="element">
    <template v-slot:label></template>
    <template v-slot:component>
      <input v-if="!element.isReadonly" v-model="element.value" :id="element.id" :name="element.id" :type="element.type"
        :class="element.cssClass" :placeholder="element.placeholderText" @input="handleInput(route.name as string, $event, element)" />
        {{ element.isValid }}
    </template>
    <template v-slot:help></template>
  </FormElement>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ElementProps } from "@/components/Form/props/Props";
import { usePageData } from "@/components/Form/data/usePageData";
import FormElement from "@/components/Form/FromElement.vue";

const route = useRoute();
const props = defineProps({
  ...ElementProps
});

const { handleInput } = usePageData();
</script>