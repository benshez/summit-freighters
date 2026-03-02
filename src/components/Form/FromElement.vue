<template>
  <div class="mb-4" v-if="element.isVisible">
    <slot name="label">
      <label :for="element.id" v-if="element.label" class="block text-sm/6 font-medium">{{ element.label }}</label>
    </slot>
    <slot name="component">
      <label v-if="element.isReadonly" class="block text-sm/6 font-medium">{{ element.value }}</label>
    </slot>
    <slot name="help">
      <small :id="`${element.id}-help`" v-if="element.helpText" class="inline-block mt-1">{{ element.helpText }}</small>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { ElementProps } from "@/components/Form/props/Props";

const props = defineProps({
  ...ElementProps
})

</script>