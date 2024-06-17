import { defineStore } from "pinia";
import axios from "@/axios";

export const useTaskStore = defineStore("task", {
    state: () => ({
        tasks: [],
        auxTasks: [],
        task: null,
        isModalCreateTask: false,
        isModeUpdateTask: false
    }),

    actions: {

        async createTask (infoNewTask){
            console.log(infoNewTask.start_date,)
            console.log(infoNewTask.student)
            const response = await axios.post("/tasks",{
                name: infoNewTask.task,
                description: infoNewTask.description,
                start_date: infoNewTask.start_date,
                due_date: infoNewTask.due_date,
                status_id: infoNewTask.status,
                priority_id: infoNewTask.priority,
                student_id: infoNewTask.student,
            })
            console.log(response.data)
        },

        async fetchTasks(idStudent){
            const response = await axios.get(`/tasks?filter[student_id]=${idStudent}&include=status,priority`);
            this.tasks = response.data.data;
            return response.data.data;
        },

        filterTask(filters){

            // valores por defecto para cuando los filtros de fecha esten vacios
            const date = new Date();
            const currentYear = date.getFullYear();
            const currentMonth = date.getMonth();
            const currentDay = date.getDate();
            const currentDate = String(currentYear) + "-" + String(currentMonth).padStart(2, '0') + "-" + String(currentDay).padStart(2, '0');

            filters.dateFilterSince = filters.dateFilterSince !== "" ? filters.dateFilterSince : "2000-01-01";
            filters.dateFilterUntil = filters.dateFilterUntil !== "" ? filters.dateFilterUntil : currentDate;

            // valores por defecto para cuando los filtros de prioridad y estado esten vacios

            filters.status = filters.status !== 0 ? filters.status : 3;
            filters.priority = filters.priority !== 0 ? filters.priority : 1;

            console.log(filters)

            const filteredTasks = this.tasks.filter(task => {
                
                return task.status_id == filters.status && task.priority_id == filters.priority && (new Date(task.start_date) >=  new Date(filters.dateFilterSince) && new Date(task.start_date) <= new Date(filters.dateFilterUntil));
            })
            this.auxTasks = this.tasks;
            this.tasks = filteredTasks;
            
            
        },

        cleanFilterTask(){
            this.tasks = this.auxTasks;
            this.auxTasks = [];
        },

        async updateTask(idTask, infoTask){
            await axios.put(`/tasks/${idTask}`, {
                name: infoTask.task,
                description: infoTask.description,
                start_date: infoTask.start_date,
                due_date: infoTask.due_date,
                status_id: infoTask.status,
                priority_id: infoTask.priority,
                student_id: infoTask.student
            })
        },

        async updateStatusTask(infoTask, idStatus){
            await axios.put(`/tasks/${infoTask.id}`, {
                name: infoTask.name,
                description: infoTask.description,
                start_date: infoTask.start_date,
                due_date: infoTask.due_date,
                status_id: idStatus,
                priority_id: infoTask.priority.id,
                student_id: infoTask.student_id
            })
        },

        async deleteTask(idTask){
            await axios.delete(`/tasks/${idTask}`);
        },

        OpenModalCreateTask(){
            this.isModalCreateTask = true;
        },

        ClosedModalCreateTask(){
            this.isModalCreateTask = false;
        },

        updateModeEnable(){
            this.isModeUpdateTask = true;
        },

        updateModeDisable(){
            this.isModeUpdateTask = false;
        }

    }
})