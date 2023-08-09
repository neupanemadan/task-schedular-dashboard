import { http as axios } from '@/axios.js'
import { defineStore } from 'pinia'

export const taskStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  actions: {
     createTask(data) {
      return new Promise((resolve, reject) => {
        return axios.post('api/task', data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
          })
          .then(({ data }) => {
            this.tasks.push(data.task)
            resolve(data.task)
          })
        .catch((error) => reject(error))
      })
    },

    async fetchTasks(filters = {}) {
        const {data} = await axios
            .get("api/tasks", {
            params: filters
        })

        this.tasks = data.tasks;
    }
  }
})
