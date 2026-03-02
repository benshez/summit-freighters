<template>
  <FormElement :element="element">
    <template v-slot:label></template>
    <template v-slot:component>
      <input v-if="!element.isReadonly" v-model="element.value" :id="element.id" :name="element.id" :type="element.type"
        :class="element.cssClass" :placeholder="element.placeholderText" @input="handleInput($event, element)" />
    </template>
    <template v-slot:help></template>
  </FormElement>
</template>

<script lang="ts" setup>
import { ElementProps } from "@/components/Form/props/Props";
import { useFormBuilderComponent } from "@/components/Form/useFormBuilderComponent";
import FormElement from "@/components/Form/FromElement.vue";

const props = defineProps({
  ...ElementProps
});

const { handleInput } = useFormBuilderComponent();
</script>