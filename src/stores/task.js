import { defineStore } from "pinia";
import axios from "@/axios";

export const useTaskStore = defineStore("task", {
    state: () => ({
        tasks: [],
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