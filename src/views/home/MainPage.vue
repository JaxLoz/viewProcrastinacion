<template>
  <NavBar />
  <div>
    <createTask v-if="OpenModalCreateTask" :updateTask="updateTaskInfo" />
  </div>
  <div>
    <div class="">
      <resumeTask :tasks="listTasks" @updateTask="updateTask" @deleteTask="deleteTask" />

    </div>
  </div>
</template>
<script setup>
import createTask from '../../components/CreateTasks.vue'
import resumeTask from '../../components/ResumeTask.vue'
import NavBar from '@/components/NavBar.vue';

import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '@/stores/task'

const task = useTaskStore()
const listTasks = ref(computed(() => task.tasks))
const idStudent = JSON.parse(sessionStorage.getItem('studentInf')).id
const OpenModalCreateTask = computed(() => task.isModalCreateTask)

//const updateMode = computed(() => task.isModeUpdateTask);
const updateTaskInfo = ref(null);

onMounted(async () => {
  await task.fetchTasks(idStudent)
})

const deleteTask = async (idDeleteTask) => {
  console.log(idDeleteTask)
  await task.deleteTask(idDeleteTask)
  await task.fetchTasks(idStudent)
}

const updateTask = (UpdateTask) => {
    console.log(UpdateTask.id)
    task.updateModeEnable();
    updateTaskInfo.value = UpdateTask
}

</script>
