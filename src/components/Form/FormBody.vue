<template>
    <div class="flex min-h-full flex-1 flex-col justify-center">
        <slot name="header"></slot>
        <slot name="content">
            <FormBuilder :elements="elements" />
        </slot>
        <slot name="footer" :elements="elements"></slot>
    </div>
</template>
<script lang="ts" setup>
import { inject, reactive } from "vue";
import FormBuilder from "@/components/Form/FormBuilder.vue";
import type { IWidgetOptions } from "@/interfaces";
import { useFormBuilderComponent } from "@/components/Form/useFormBuilderComponent";

const options = inject("options") as IWidgetOptions;
const { findCurrentPageElements } = useFormBuilderComponent();
const elements = reactive(findCurrentPageElements().elements)

</script>