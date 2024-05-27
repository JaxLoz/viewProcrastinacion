import axios from "@/axios";
import { defineStore } from "pinia";

export const useCareersStore = defineStore("carrers", {
    state: () => ({
        careers: [],
    }),

    actions: {
        async fetchCarrers(idFaculty) {
            const response = await axios.get("/careers?filter[faculty_id]="+idFaculty);
            this.careers = response.data.data;
        }
    }
});