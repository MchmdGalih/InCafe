<template>
  <div class="w-screen h-screen flex justify-center items-center px-8">
    <section class="max-w-max px-8 py-4 flex flex-col gap-2">
      <div class="text-center font-secondary space-y-2 mb-2">
        <h1 class="font-extrabold text-4xl">Register to make your account</h1>
        <p class="font-light">Welcome! Please enter your details.</p>
      </div>

      <div class="flex w-full flex-col">
        <div class="divider divider-neutral">
          <font-awesome-icon icon="fa-solid fa-coffee" size="xl" class="text-amber-900" />
          OR
          <font-awesome-icon icon="fa-solid fa fa-cutlery" size="xl" class="text-amber-900" />
        </div>
      </div>
      <form class="p-2" @submit.prevent="registerHandler">
        <div class="flex flex-col mb-2">
          <label for="username" class="font-secondary font-bold"> Username </label>

          <input
            type="username"
            name="username"
            id="username"
            placeholder="Enter your username"
            class="border rounded p-2"
            v-model="payload.username"
          />

          <p class="text-red-600" v-show="v$.username.$error" v-for="error in v$.username.$errors">
            {{ error.$message }}
          </p>
        </div>
        <div class="flex flex-col mb-2">
          <label for="email" class="font-secondary font-bold"> Email </label>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            class="border rounded p-2"
            v-model="payload.email"
          />

          <p class="text-red-600" v-show="v$.email.$error" v-for="error in v$.email.$errors">
            {{ error.$message }}
          </p>
        </div>

        <div class="flex flex-col mb-2">
          <label for="password" class="font-secondary font-bold"> Password </label>

          <span class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              name="password"
              id="password"
              placeholder="Password"
              class="border w-full font-secondary rounded p-2 relative"
              v-model="payload.password"
            />
            <font-awesome-icon
              :icon="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              @click="togglePassword"
            />
          </span>

          <p class="text-red-600" v-show="v$.password.$error" v-for="error in v$.password.$errors">
            {{ error.$message }}
          </p>
        </div>

        <RouterLink to="/" class="font-secondary underline">Forgot Password</RouterLink>

        <button
          :disabled="isLoading"
          type="submit"
          class="w-full btn rounded text-white bg-amber-900 mt-2 hover:bg-amber-700 hover:text-white transition-all duration-500 ease-in-out"
        >
          <span v-if="isLoading" class="loading loading-spinner text-white"></span>
          <span v-else>Sign Up</span>
        </button>
      </form>

      <p class="text-center font-light">
        Already have an account?
        <RouterLink to="/sign-in" class="font-secondary font-bold underline">Sign In</RouterLink>
      </p>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import useVuelidate from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const showPassword = ref(false)
const store = useAuthStore()
const isLoading = ref(false)

const payload = reactive({
  username: '',
  email: '',
  password: '',
})

const router = useRouter()

const rules = computed(() => ({
  username: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) },
}))

const v$ = useVuelidate(rules.value, payload)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const registerHandler = async () => {
  try {
    const isValidate = await v$.value.$validate()

    if (!isValidate) return

    isLoading.value = true
    await store.register(payload)

    return router.replace({
      path: '/sign-in',
      state: {
        isSuccess: true,
      },
    })
  } catch (error) {
    toast.error('User already exists!')
  } finally {
    isLoading.value = false
  }
}
</script>
