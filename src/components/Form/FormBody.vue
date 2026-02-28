<template>
    <div class="flex min-h-full flex-1 flex-col justify-center">
        <slot name="header"></slot>
        <slot name="content" :save="OnSaveClicked">
            <FormBuilder />
        </slot>
        <slot name="footer"></slot>
    </div>
</template>
<script lang="ts" setup>
import FormBuilder from "@/components/Form/FormBuilder.vue";

const OnSaveClicked = () => {
  const y = ""
}
</script>