<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar class='demo-app-calendar' :options="calendarOptions">
      </FullCalendar>
    </div>
    <TaskDetail
      v-if="showDetail"
      @emitCancel="onCancelUpdate"
    />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { mapActions, mapState } from "pinia"
import { aboutStore } from "@/store/about.js"
import jaLocale from '@fullcalendar/core/locales/ja'
import TaskDetail from './components/TaskDetail.vue'

export default defineComponent({
components: {
  FullCalendar,
  TaskDetail
},
computed: {
  ...mapState(aboutStore, ["abouts"])
},
data() {
  return {
    calendarOptions: {
      plugins: [timeGridPlugin, interactionPlugin],
      events: [
        // Sample events
        { title: 'Event 1', start: '2023-08-08T10:00:00', end: '2023-08-08T12:00:00' },
        { title: 'Event 2', start: '2023-08-08T14:00:00', end: '2023-08-08T16:00:00' },
        // Add more events as needed
      ],
      editable: true,
      initialView: 'timeGridWeek',
      locale: jaLocale,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridWeek,timeGridDay' // user can switch between the two
      },
      select: this.handleSelect,
      eventClick: this.handleSelect,
      selectable: true,
      selectMirror: true,
    },
    showDetail: false
  };
},

methods: {
  ...mapActions(aboutStore, ["fetchAbout"]),
  handleSelect () {
    this.showDetail = true
  },
  onCancelUpdate () {
    this.showDetail = false
  }
},
mounted() {
  // this.fetchAbout()
}
});
</script>