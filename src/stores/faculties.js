import axios from "@/axios";
import { defineStore } from "pinia";

export const useFacultiesStore = defineStore("faculties", {
    state: () => ({
        faculties: [],
    }),

    actions: {
        async fetchFaculties() {
            const response = await axios.get("/faculties");
            this.faculties = response.data.data;
            console.log(response.data.data);
        }
    }
});