<template>
  <header class="bg-white bg-opacity-90 backdrop-blur-md fixed w-full z-10">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <button @click="goToProfile" class="text-gray-600 hover:text-gray-900 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-user"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
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
          <button
            @click="scheduleTask"
            class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none"
          >
            Agendar
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup>
import { useTaskStore } from '@/stores/task'

const task = useTaskStore()

const scheduleTask = () => {
  task.OpenModalCreateTask()
}
</script>
