<template>
  <div class="row">
    <div class="col-12 header">
      <h1>Today's Event</h1>
    </div>
    <div class="col-12">
      <div class="schedule-container" v-if="todaySchedule.length">
        <n-data-table
          :columns="columns"
          :data="todaySchedule"
          :pagination="pagination"
          :bordered="false"
        />
      </div>
      <div class="no-schedule" v-else>
        No Schedules added for Today.
        <n-button quaternary type="success" @click="$router.push('schedular')">
          Add new
        </n-button>
      </div>
    </div>
  </div>
</template>
  <script>
import { defineComponent, ref, h} from "vue";
import { mapActions, mapState } from "pinia"
import { taskStore } from "@/store/task.js"
import moment from 'moment'
import { NButton, useMessage } from "naive-ui";

  const createColumns = ({
    play
  }) => {
    return [
      {
        title: "Name",
        key: "name"
      },
      {
        title: "Start Data",
        key: "start_date"
      },
      {
        title: "End Date",
        key: "end_date"
      },
      {
        title: "Priority",
        key: "priority"
      },
      {
        title: "Remarks",
        key: "remarks"
      }
    ];
  }
    
  export default defineComponent({
    computed: {
      ...mapState(taskStore, ["tasks"])
    },
    setup() {
      const message = useMessage();
      return {
        columns: createColumns({
          play(row) {
            message.info(`Play ${row.title}`);
          }
        }),
        pagination: false
      };
    },
    data() {
      return {
        todaySchedule: ref([])
      };
    },
    methods: {
      ...mapActions(taskStore, ["fetchTasks"]),
      async getTodayEvent () {
        await this.fetchTasks()
        const todayStart = moment().startOf('day')
        const todayEnd = moment().endOf('day')

        console.log(this.tasks)

        this.todaySchedule = this.tasks.filter(item => {
          const startDate = moment(item.start_date, 'YYYY-MM-DD HH:mm:ss')
          return startDate.isBetween(todayStart, todayEnd, null, '[]')
        })
      }
  
    },
    mounted() {
      this.getTodayEvent()
    }
  });
  </script>
  <style scoped>
  .n-card {
    max-width: 300px;
  }
  .header {
    margin-bottom: 12px;
  }

  .schedule-container {
    display: flex;
    flex-direction: column;
  }

  .no-schedule {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 12px;
  }
  </style>