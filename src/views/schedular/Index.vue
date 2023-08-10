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
      @updateTask="onUpdateTask"
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
    selectedTask: null
  };
},

methods: {
  ...mapActions(taskStore, ["fetchTasks", "createTask", "deleteTask", "updateTask"]),
  async prepareEvents () {
    await this.fetchTasks()
    this.calendarOptions.events = this.tasks.map(task => ({
      id: task.id,
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
        id: event.id,
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
  onUpdateTask (data) {
    const id = data.id
    delete data.id
    this.updateTask(id, data).then((task) => {
      this.calendarOptions.events = this.calendarOptions.events.map((event) => {
        if (event.id === task.id) {
          return {
            id: event.id,
            title: task.name,
            start: task.start_date,
            end: task.end_date,
            priority: task.priority,
            remarks: task.remarks,
            color: this.getColor(task.priority)
          };
        } else {
          return event;
        }
      });
    })
    this.showDetail = false
  },
  onSubmitTask (task) {
    this.createTask(task).then( (task) => {
      this.calendarOptions.events.push({
        id: task.id,
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
  onDeleteTask (id) {
    this.deleteTask(id).then((task) => {
    this.calendarOptions.events = this.calendarOptions.events.filter((event) => {
      return (
        event.title !== task.name ||
        event.start !== task.start_date ||
        event.end !== task.end_date ||
        event.priority !== task.priority ||
        event.remarks !== task.remarks ||
        event.color !== this.getColor(task.priority)
      );
    });
  });
    this.showDetail = false
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
      const data = {
          id: event.id,
          name: event.title,
          start_date: moment(event.startStr).format('YYYY-MM-DD HH:mm:ss'),
          end_date: moment(event.endStr).format('YYYY-MM-DD HH:mm:ss'),
          priority:  event.extendedProps.priority,
          remarks:  event.extendedProps.remarks
      }
        this.onUpdateTask(data)
      },
  },
mounted() {
    this.prepareEvents()
}
});
</script>