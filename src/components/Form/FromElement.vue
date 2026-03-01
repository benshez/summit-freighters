<template>
  <div class="mb-4" v-if="element.visible">
    <slot name="label">
      <label :for="element.id" v-if="element.label" class="block text-sm/6 font-medium">{{ element.label }}</label>
    </slot>
    <slot name="component">
      <div v-if="element.readonly" class="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline">{{ element.value }}</div>
    </slot>
    <slot name="help">
      <small :id="`${element.id}-help`" v-if="element.helpText" class="inline-block mt-3">{{ element.helpText }}</small>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { ElementProps } from "@/components/Form/props/Props";

const props = defineProps({
  ...ElementProps
})

</script>