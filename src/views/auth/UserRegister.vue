<template>
  <div class="bg-[#f9fafb] min-h-screen flex flex-col items-center justify-center">
    <div
      class="bg-white px-8 pt-10 pb-5 drop-shadow-lg rounded-md flex flex-col items-center justify-center gap-y-5 w-full max-w-2xl"
    >
      <div class="text-center flex flex-col gap-y-2">
        <h1 class="block text-3xl font-semibold">Register</h1>
        <p class="block text-sm text-gray-500">Get your account</p>
      </div>

      <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <!-- Group 1: Name and Email -->
        <div class="flex flex-col gap-y-2">
          <label class="text-base font-medium text-gray-900" for="primerNombre">First name</label>
          <input
            class="h-9 w-full py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
            v-model="formRegister.first_name"
            type="text"
            id="primerNombre"
            name="primerNombre"
            required
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="text-base font-medium text-gray-900" for="segundoNombre">Last name</label>
          <input
            class="h-9 w-full py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
            v-model="formRegister.last_name"
            type="text"
            id="segundoNombre"
            name="segundoNombre"
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="text-base font-medium text-gray-900" for="email">Email</label>
          <input
            class="h-9 w-full py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
            v-model="formRegister.email"
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="text-base font-medium text-gray-900" for="password">Password</label>
          <input
            class="h-9 w-full py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
            v-model="formRegister.user_password"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="text-base font-medium text-gray-900" for="confirmPassword"
            >Confirm password</label
          >
          <input
            class="h-9 w-full py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
            v-model="formRegister.password_confirmation"
            type="password"
            id="confirmPassword"
            name="password"
            required
          />
        </div>

        <!-- Group 2: Age, Gender, Phone -->
        <div class="flex flex-col gap-y-2">
          <label class="text-base font-medium text-gray-900" for="age">Born date</label>
          <input
            class="h-9 w-full py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
            v-model="formRegister.born_date"
            type="date"
            id="age"
            name="age"
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="text-base font-medium text-gray-900" for="gender">Gender</label>
          <select
            class="h-9 w-full py-1 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
            v-model="formRegister.gender"
            id="gender"
            name="gender"
            required
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="text-base font-medium text-gray-900" for="phone">Phone</label>
          <input
            class="h-9 w-full py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
            v-model="formRegister.phone"
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{10}"
            required
          />
        </div>

        <!-- Group 3: Faculty, Program, Semester -->
        <div class="flex flex-col gap-y-2">
          <label class="text-base font-medium text-gray-900" for="faculty">Faculty</label>
          <select
            @change="getCarrers"
            v-model="formRegister.id_faculty"
            class="h-9 w-full py-1 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
            id="faculty"
            name="faculty"
            required
          >
            <option v-for="faculti in facultiesList" :key="faculti.id" :value="faculti.id">
              {{ faculti.name }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-y-2">
          <label class="text-base font-medium text-gray-900" for="program"
            >University program</label
          >
          <select
            @change="getSemesters"
            v-model="formRegister.id_career"
            class="h-9 w-full py-1 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
            id="program"
            name="program"
            required
          >
            <option v-for="carrer in carrersList" :key="carrer.id" :value="carrer.id">
              {{ carrer.name }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-y-2">
          <label class="text-base font-medium text-gray-900" for="semester">Semester</label>
          <select
            v-model="formRegister.id_semester"
            class="h-9 w-full py-1 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none"
            id="semester"
            name="semester"
            required
          >
            <option v-for="semester in semestersList" :key="semester.id" :value="semester.id">
              {{ semester.semester_number }}
            </option>
          </select>
        </div>

        <div class="col-span-1 md:col-span-2 flex justify-center">
          <input
            class="bg-[#4f46e5] hover:bg-[#6366f1] text-white font-medium py-1.5 px-5 w-full rounded-md"
            type="submit"
            value="Register"
          />
        </div>
      </form>

      <div class="flex flex-row justify-center items-center gap-x-1">
        <p class="block text-sm text-gray-500">Already have an account?</p>
        <router-link to="/login" class="block font-semibold text-[#4339ff] hover:text-[#6366f1]"
          >Login</router-link
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import router from '@/router/index.js'
import { useFacultiesStore } from '@/stores/faculties.js'
import { useCareersStore } from '@/stores/careers.js'
import { useSemestersStore } from '@/stores/semesters.js'
import { useUserStore } from '@/stores/user.js'

const faculties = useFacultiesStore()
const careers = useCareersStore()
const semesters = useSemestersStore()
const user = useUserStore()

const facultiesList = computed(() => faculties.faculties)
const carrersList = computed(() => careers.careers)
const semestersList = computed(() => semesters.semesters)

const formRegister = ref({
  first_name: '',
  last_name: '',
  phone: '',
  born_date: '',
  gender: '',
  id_semester: 0,
  id_faculty: 0,
  id_career: 0,
  id_credential: 0,
  email: '',
  user_password: '',
  password_confirmation: ''
})

const submit = async () => {
  await user.registerUser(formRegister.value)
  const response = await user.fetchUser()

  await user.registerStudent (formRegister.value, formRegister.value.id_semester,   response.id);
 router.push({name: 'Home'});
console.log(formRegister.value)
  
}

const getCarrers = async () => {
  await careers.fetchCarrers(formRegister.value.id_faculty)
  console.log(formRegister.value.id_faculty)
}

const getSemesters = async () => {
  await semesters.fetchSemesters(formRegister.value.id_career)
  console.log(formRegister.value.id_career)
}

onMounted(async () => {
  await faculties.fetchFaculties()
})
</script>
