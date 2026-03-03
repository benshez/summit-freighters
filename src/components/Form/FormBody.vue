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
import { useRoute } from "vue-router";
import { inject, reactive } from "vue";
import FormBuilder from "@/components/Form/FormBuilder.vue";
import type { IWidgetOptions } from "@/interfaces";
import { usePageData } from "@/components/Form/data/usePageData";

const route = useRoute();
const options = inject("options") as IWidgetOptions;
const { getElementsForCurrentPage } = usePageData();
const elements = reactive(getElementsForCurrentPage(route.name as string).elements);

</script>