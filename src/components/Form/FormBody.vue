<template>
    <div class="flex w-full min-h-full flex-1 flex-col justify-center">
        <slot name="header"></slot>
        <slot name="content">
            <FormBuilder :elements="elements" />
        </slot>
        <slot name="footer" :elements="elements"></slot>
    </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { inject, toRefs } from "vue";
import FormBuilder from "@/components/Form/FormBuilder.vue";
import type { IWidgetOptions } from "@/interfaces";
import { useFormStore } from "@/store/forms/formStore";

const formStore = useFormStore();
const route = useRoute();
const options = inject("options") as IWidgetOptions;
formStore.getElements(route.name as string)
const { elements } = toRefs(formStore);

</script>