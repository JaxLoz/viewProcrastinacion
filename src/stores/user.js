import axios from "@/axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
    }),

    actions: {

        
        async fetchUser(){
            const response = await axios.get("user");
            this.user = response.data.data;
            return response.data;
        },

        async authCsrf(){
            await axios.get("/sanctum/csrf-cookie");
        },

        async registerUser (credentials){
            await this.authCsrf();
            await axios.post("/register",{
                email: credentials.email,
                password: credentials.user_password,
                password_confirmation: credentials.password_confirmation
            })
     
        
        },

        async registerStudent(newStudent, id_semester, id_user){
            const response = await axios.post("/students",{
                
                first_name: newStudent.first_name,
                last_name: newStudent.last_name,
                gender: newStudent.gender,
                born_date: newStudent.born_date,
                phone: newStudent.phone,
                user_id: id_user,
                semester_id: id_semester
            }, {
                withCredentials: true
            })

            console.log(response.data.data)
        },

        async loginUser(credentials){
            
            await this.authCsrf();
            await axios.post("/login ",{
                email: credentials.email,
                password: credentials.user_password
            })

        }
    }
})