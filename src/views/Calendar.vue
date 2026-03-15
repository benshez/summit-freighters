<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <div class="overflow-hidden rounded-2xl border col-span-12 custom-calendar">
      <FullCalendar ref="calendarRef" class="min-h-screen" :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const events = ref([])

const handleDateSelect = () => {

}

const handleEventClick = () => {

}

const renderEventContent = () => {

}

const openModal = () => {

}

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: "prev,next addEventButton",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  events: events,
  selectable: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventContent: renderEventContent,
  customButtons: {
    addEventButton: {
      text: "Add Event +",
      click: openModal,
    },
  },
})


</script>
