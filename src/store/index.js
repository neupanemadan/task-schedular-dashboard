import { http as axios } from '@/axios.js'
import { defineStore } from 'pinia'

export const documentStore = defineStore('documents', {
  state: () => ({
    users: []
  }),
  actions: {
    getUsers() {
      return axios.get("/users").then(({ data }) => {
        this.users = data.users.map(user => {
          return {
            label: user.full_name,
            value: user.id,
            department_id: user.department_id
          };
        });
      });
    }
  }
})
