import { http as axios } from '@/axios.js'
import { defineStore } from 'pinia'

export const taskStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  actions: {
     createTask(data) {
      return new Promise((resolve, reject) => {
        return axios.post('api/task', data)
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

    updateTask(id, data) {
      return new Promise((resolve, reject) => {
        axios
        .put(`api/task/${id}`, data)
        .then(({ data }) => {
          const updatedData = data.task;
          const index = this.tasks.findIndex(
            task => task.id === updatedData.id
          );
          this.tasks.pop(index, 1, updatedData);


          resolve(updatedData)
        })
          .catch((error) => reject(error));
     })
    },
  }
})
