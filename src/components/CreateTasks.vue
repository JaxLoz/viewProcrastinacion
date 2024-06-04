<template>
    <Teleport to="body">
      <div class="fixed inset-0 bg-[#424242] bg-opacity-50 flex items-center justify-center z-50" @click.self="closedModal">
        <div class="flex flex-col items-center justify-center font-sans p-4 sm:p-8 min-w-[300px] sm:min-w-[500px] md:min-w-[600px] max-w-[90%] backdrop-blur-2xl rounded-lg">
          <form class="w-full px-8 pt-9 pb-5 bg-[#ffffff] rounded-md flex flex-col gap-y-4 drop-shadow-lg" @submit.prevent="buttonPressed">
            <div class="text-center">
              <h1 class="text-3xl mb-5 font-semibold">{{ title }}</h1>
            </div>
            <div class="flex flex-col gap-y-2">
              <label class="text-base font-medium text-gray-900" for="task">Task</label>
              <input
                class="h-9 w-full py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
                type="text"
                id="task"
                v-model="formTask.task"
                required
              >
            </div>
            <div class="flex flex-col gap-y-2">
              <label class="text-base font-medium text-gray-900" for="due_date">Expiration Date</label>
              <input
                class="h-9 w-full py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
                type="date"
                id="due_date"
                v-model="formTask.due_date"
                required
              >
            </div>
            <div class="flex flex-col gap-y-2">
              <label class="text-base font-medium text-gray-900" for="priority">Priority</label>
              <select
                class="h-9 w-full py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
                id="priority"
                v-model="formTask.priority"
                required
              >
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </div>
            <div class="flex flex-col gap-y-2">
              <label class="text-base font-medium text-gray-900" for="description">Description of Task</label>
              <textarea
                class="h-24 w-full py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
                id="description"
                v-model="formTask.description"
              ></textarea>
            </div>
            <div class="flex flex-row">
              <button class="bg-[#4f46e5] hover:bg-[#6366f1] text-white font-medium py-1.5 px-5 w-full rounded-md" type="submit">{{ textButton }}</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup>

    import router from '@/router';
    import { computed, onMounted, ref } from 'vue';
    import { useTaskStore } from '@/stores/task';
    
    const date = new Date();
    const task = useTaskStore();
    
    const title = ref("New Task");
    const textButton = ref("Create Task")
    const updateModeEnable = computed(() => task.isModeUpdateTask);

    const formTask = ref({
    task: "",
    start_date: date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate(),
    due_date: "",
    priority: 0,
    status: 2,
    description: "",
    student: sessionStorage.getItem("studentInf") !== null ? JSON.parse(sessionStorage.getItem("studentInf")).id : 0
    });

    const closedModal = () =>{
        router.push({name: 'procrastination'})
        task.ClosedModalCreateTask()
        task.updateModeDisable();
    }

    const buttonPressed = () =>{
      if(updateModeEnable.value){
        updateTask();
      }else{
        createNewTask();
      }
    }
    const updateTask = async () =>{
      await task.updateTask(props.updateTask.id, formTask.value);
      await task.fetchTasks(formTask.value.student);
      task.ClosedModalCreateTask();
    }
    
    const createNewTask = async () =>{
      await task.createTask(formTask.value);
      await task.fetchTasks(formTask.value.student);
      task.ClosedModalCreateTask();
    }
    
    //const emit = defineEmits(["closedCreateTask"])

    onMounted( ()=>{
      if(updateModeEnable.value){
        title.value = "Update task"
        textButton.value = "Update Task"
        
        if(props.updateTask != null){
          formTask.value.task = props.updateTask.name;
          formTask.value.start_date = props.updateTask.start_date;
          formTask.value.due_date = props.updateTask.due_date;
          formTask.value.priority = props.updateTask.priority.id;
          formTask.value.description = props.updateTask.description;
        }
        
      }
    })
    
    const props = defineProps({
        updateTask:{
            type: Object
        }
        /*
        updateMode:{
          type: Boolean,
          default: false
        }
        */
        })


</script>