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
    },

    deleteTask(id) {
      return new Promise((resolve, reject) => {
        axios
        .delete(`api/task/${id}`)
        .then(({ data }) => {
          const deletedData = data.task;
          const index = this.tasks.findIndex(
            task => task.id === deletedData.id
          );
          this.tasks.pop(index, 1, deletedData);


          resolve(deletedData)
        })
          .catch((error) => reject(error));
     })
    },
  }
})
