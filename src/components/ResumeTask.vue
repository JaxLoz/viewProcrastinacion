<template>

<div class="min-h-screen p-4">
    <!--<h1 class="text-4xl font-bold text-center mb-8">Lista de Tareas</h1>-->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="task in tasks" :key="task.id" class="bg-white p-4 rounded-lg shadow-lg flex flex-col space-y-4">
        <div class="flex-1">
          <div class="text-sm text-gray-500 flex justify-between items-center">
            <span>Tareas</span>
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-5 9a5 5 0 00-5-5H5a5 5 0 00-5 5v5h20v-5a5 5 0 00-5-5h-3a5 5 0 00-5 5zm0 0v4m0 0v-4m0 0H5m8 0h6"></path>
              </svg>
              {{ task.due_date }}
            </span>

            <div class="flex justify-end space-x-2">
              <button @click="updateAction(task)" class="p-1 rounded hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-edit hover:stroke-[#6366f1]">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                  <path d="M16 5l3 3" />
                </svg>
              </button>
              <button @click="delteAction(task.id)" class="p-1 rounded hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-trash hover:stroke-[#ad2020]">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
          </div>
          <p v-if="task.status.id != 1" class="mt-1 text-lg font-medium text-gray-900">{{ task.description }}</p>
          <p v-else-if="task.status.id === 1" class="mt-1 text-lg font-medium text-gray-900 line-through">{{ task.description }}</p>
          <p class="mt-1 text-sm text-gray-600">{{ task.name }}</p>
          <div class="mt-2 flex justify-between items-center">
            <span class="text-gray-600">
              Prioridad: 
              <span :class="{'text-red-500': task.priority.name === 'alta', 'text-yellow-500': task.priority.name === 'media', 'text-green-500': task.priority.name === 'baja'}">
                {{ task.priority.name }}
              </span>
            </span>
            <span class="text-gray-600" >Estado: {{ task.status.name }}</span>
          </div>
          <div class="mt-2 flex justify-between items-center">
            <label class="flex items-center space-x-2">
              <input v-if="task.status.id != 1" type="checkbox" v-model="task.status.completed" :value="true" @change="markAsCompleted(task)" class="form-radio text-indigo-600">
              <input v-else-if="task.status.id === 1" type="checkbox" :checked="true" v-model="task.status.completed" :value="true" @change="markAsCompleted(task)" class="form-radio text-indigo-600">
              <span class="text-gray-600">Marcar como finalizada</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { useTaskStore } from '@/stores/task';
import { onMounted } from 'vue';


  const task = useTaskStore();

  const markAsCompleted = async (infTask) => {
    if(infTask.status.id != 1){
      await task.updateStatusTask(infTask, 1);
      await task.fetchTasks(infTask.student_id);
    }else if(infTask.status.id === 1){
      await task.updateStatusTask(infTask, 2);
      await task.fetchTasks(infTask.student_id);
    }
  }

  const updateAction = (infTaskUpdate) => {
    emit("updateTask", infTaskUpdate)
    task.OpenModalCreateTask();
    task.updateModeEnable();
  }

  const delteAction = (idTaskDelete) => {
    emit("deleteTask", idTaskDelete)
  }

  onMounted(() => {
      
  })  
    
  defineProps({
      tasks:{
          type: Array,
          required:true,
      } 
  })


  const emit = defineEmits(["updateTask", "deleteTask"]);


</script>