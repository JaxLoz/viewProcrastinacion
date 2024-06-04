import { defineStore } from "pinia";
import axios from "@/axios";

export const useStudentStore = defineStore("student", {
    state: () => ({
        students: [],
        student: null,
    }),

    actions: {
        async fetchStudent(idUser){
            const response = await axios.get(`/students?filter[user_id]=${idUser}`);
            this.student = response.data.data[0];
            return response.data.data[0];
        },
        
    }
})