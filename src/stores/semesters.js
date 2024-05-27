import { defineStore } from "pinia";
import axios from "@/axios";

export const useSemestersStore = defineStore("semesters", {
    state: () => ({
        semesters: [],
    }),

    actions: {
        async fetchSemesters(idCareer) {
            const response = await axios.get("/semesters?fileter[career_id]="+idCareer);
            this.semesters = response.data.data;
        },

        async registerSemester(newSemester){
            const response = await axios.post("/semesters", {
                semester_number: newSemester.semester_number,
                career_id: newSemester.career_id
            })
            console.log(response.data.data)
            return response.data.data;
        }
    }
});