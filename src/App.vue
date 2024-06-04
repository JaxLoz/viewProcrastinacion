<template>
  <NavBar />
  <CreateTasks v-if="OpenModalCreateTask" />
  <RouterView />
</template>
  <script setup>
  import { RouterView } from 'vue-router'
  import NavBar from '@/components/NavBar.vue';
  import CreateTasks from '@/components/CreateTasks.vue';
  import {useTaskStore} from "@/stores/task";
  import { computed } from "vue";

const task = useTaskStore();
const OpenModalCreateTask = computed(() => task.isModalCreateTask)
  </script>

