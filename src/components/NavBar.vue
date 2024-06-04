<template>
    <nav class="bg-white bg-opacity-90 backdrop-blur-md fixed w-full z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <button @click="goToProfile" class="text-gray-600 hover:text-gray-900 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
              <path d="M20.205 19.37a10.6 10.6 0 0 1 -16.415 0" />
              <path d="M10.5 2a5 5 0 1 1 0 10a5 5 0 0 1 0 -10" />
            </svg>
          </button>
        </div>
        <div class="hidden md:flex space-x-8">
          <a href="#home" class="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#tasks" class="text-gray-600 hover:text-gray-900">Tareas</a>
          <a href="#calendar" class="text-gray-600 hover:text-gray-900">Calendario</a>
          <a href="#settings" class="text-gray-600 hover:text-gray-900">Configuración</a>
        </div>
        <div class="flex items-center">
          <button @click="scheduleTask" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none">
            Agendar
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>

import {useTaskStore} from "@/stores/task";


const task = useTaskStore();

const scheduleTask = () => {
    task.OpenModalCreateTask();
}

</script>