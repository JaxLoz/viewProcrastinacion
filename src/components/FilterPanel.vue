<template>
  <div class="bg-white p-4 rounded-lg shadow-md w-72 min-w-52 h-full">
    <h2 class="text-lg font-semibold mb-4">Filtros</h2>

    <div class="mb-4">
      <label class="block text-gray-700 font-semibold mb-2" for="status-filter">Estado</label>
      <select
        id="status-filter"
        v-model="filters.status"
        class="w-full border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="1">Finalizada</option>
        <option value="2">En progreso</option>
        <option value="3">Pendiente</option>
        <option value="4">Vencida</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 font-semibold mb-2" for="priority-filter">Prioridad</label>
      <select
        id="priority-filter"
        v-model="filters.priority"
        class="w-full border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="1">Alta</option>
        <option value="2">Moderada</option>
        <option value="3">Baja</option>
      </select>
    </div>

    <div class="mb-4">
      <h2 class="block text-gray-700 font-semibold mb-2">Fecha</h2>
      <div>
        <label class="block text-gray-700 font-semibold mb-2 text-sm" for="date-since">desde:</label>
        <input
          id="date-since"
          v-model="filters.dateFilterSince"
          type="date"
          class="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2 text-sm" for="date-until">hasta:</label>
        <input
          id="date-until"
          v-model="filters.dateFilterUntil"
          type="date"
          class="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
      
    </div>
    <div class="flex flex-row justify-around">
    <button
    @click="applyFilters"
      class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none"
    >
      Aplicar
    </button>

    <button
      @click="cleanFilters"
      class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none"
    >
      Limpiar
    </button>
    </div>
  </div>
</template>
<script setup>
    import { ref } from 'vue'
    import {useTaskStore} from '@/stores/task'

    const task = useTaskStore();
    
    const filters = ref({
        status: 0,
        priority: 0,
        dateFilterSince: '',
        dateFilterUntil: ''
    })

    const applyFilters = () => {
      task.filterTask(filters.value)
    }

    const cleanFilters = () => {
      task.cleanFilterTask();
    }
</script>