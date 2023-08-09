<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar class='demo-app-calendar' :options="calendarOptions">
      </FullCalendar>
    </div>
    <TaskDetail
      v-if="showDetail"
      :selected-task="selectedTask"
      @emitCancel="onCancelUpdate"
      @submitTask="onSubmitTask"
      @deleteTask="onDeleteTask"
    />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { mapActions, mapState } from "pinia"
import { taskStore } from "@/store/task.js"
import jaLocale from '@fullcalendar/core/locales/ja'
import TaskDetail from './components/TaskDetail.vue'
import moment from 'moment'

export default defineComponent({
components: {
  FullCalendar,
  TaskDetail
},
computed: {
  ...mapState(taskStore, ["tasks"])
},
data() {
  return {
    calendarOptions: {
      plugins: [timeGridPlugin, interactionPlugin],
      events: [],
      editable: true,
      initialView: 'timeGridWeek',
      locale: jaLocale,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      select: this.handleSelect,
      eventClick: this.handleEventClick,
      eventDrop: this.handleEventDropAndResize,
      eventResize: this.handleEventDropAndResize,
      selectable: true,
      selectMirror: true,
    },
    showDetail: false,
    selectedTask: null,
    // tasks: []
  };
},

methods: {
  ...mapActions(taskStore, ["fetchTasks", "createTask"]),
  async prepareEvents () {
    await this.fetchTasks()
    this.calendarOptions.events = this.tasks.map(task => ({
      title: task.name,
      start: task.start_date,
      end: task.end_date,
      priority: task.priority,
      remarks: task.remarks,
      color: this.getColor(task.priority)
    }));
  },
  handleSelect (info) {
    const data = {
        name: " ",
        start_date: moment(info.startStr).format('YYYY-MM-DD HH:mm:ss'),
        end_date: moment(info.endStr).format('YYYY-MM-DD HH:mm:ss'),
        priority: "regular",
        remarks: " "
    }
    this.selectedTask = data
    this.showDetail = true
  },
  handleEventClick ({event}) {
    if (event.display === 'background') {
        return
      }
    const data = {
        name: event.title,
        start_date: moment(event.startStr).format('YYYY-MM-DD HH:mm:ss'),
        end_date: moment(event.endStr).format('YYYY-MM-DD HH:mm:ss'),
        priority:  event.extendedProps.priority,
        remarks:  event.extendedProps.remarks
    }
    this.selectedTask = data
    this.showDetail = true
  },
  onCancelUpdate () {
    this.showDetail = false
  },
  onSubmitTask (task) {
    this.createTask(task).then( (task) => {
      this.calendarOptions.events.push({
        title: task.name,
        start: task.start_date,
        end: task.end_date,
        priority: task.priority,
        remarks: task.remarks,
        color: this.getColor(task.priority)
      })
     }
    )
    this.showDetail = false
  },
  onDeleteTask () {

  },
  getColor (priority) {
    if (priority === 'urgent') {
      return '#ff1a1a'
    } else if (priority === 'essential') {
      return '#4d4dff'
    } else {
      return '#009933'
    }
  },
  handleEventDropAndResize ({event}) {
      const schedule = event.extendedProps.schedule
      this.computeSagyouJikan({
        kaishi_yotei: moment(event.startStr).format('YYYY-MM-DD 08:30:00'),
        kanryou_yotei: moment(event.endStr).format('YYYY-MM-DD 17:30:00')
      }).then((response) => {
        this.update({
          columns: this.chart.data_config.columns,
          data: {
            ...schedule.getFormData(),
            daily_target: response.daily_target,
            kaishi_yotei: moment(event.startStr).format('YYYY-MM-DD 08:30:00'),
            kanryou_yotei: moment(event.endStr).format('YYYY-MM-DD 17:30:00'),
            updated_by: this.currentUser.name
          },
          id: schedule.id
        }).then((schedule) => {
          event.setExtendedProp('schedule', schedule)
        })
      })
    },
  },
mounted() {
    this.prepareEvents()
}
});
</script>