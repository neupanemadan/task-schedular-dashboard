<template>
    <n-row gutter="12">
      <h1>Home</h1>
      <p>{{ tasks }}</p>
    </n-row>
  </template>
  <script>
  import { defineComponent, ref} from "vue";
import { mapActions, mapState } from "pinia"
  
  export default defineComponent({
    computed: {
      ...mapState(taskStore, ["tasks"])
    },
      
  
    methods: {
      ...mapActions(taskStore, ["fetchTasks"]),
  
    },
    mounted() {
      this.fetchTasks()
    }
  });
  </script>
  <style scoped>
  .n-card {
    max-width: 300px;
  }
  </style>