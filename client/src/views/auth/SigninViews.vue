<template>
  <div class="w-screen h-screen flex justify-center items-center px-8">
    <section class="max-w-max px-8 py-4 flex flex-col gap-2">
      <div class="text-center font-secondary space-y-2 mb-2">
        <h1 class="font-extrabold text-4xl">Log in to your account</h1>
        <p class="font-light">Welcome back! Please enter your details.</p>
      </div>

      <div class="flex justify-center items-center gap-2">
        <hr class="w-full h-2 font-bold" />
        <font-awesome-icon icon="fa-solid fa-coffee" size="xl" class="text-amber-900" />

        OR
        <font-awesome-icon icon="fa-solid fa fa-cutlery" size="xl" class="text-amber-900" />
        <hr class="w-full h-2 font-bold" />
      </div>
      <form class="p-2" @submit.prevent="handleSignin">
        <div class="flex flex-col mb-2">
          <label for="email" class="font-secondary font-bold"> Email </label>

          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your password"
            class="border rounded p-2"
            v-model="payload.email"
          />
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
        </div>

        <RouterLink to="/" class="font-secondary underline">Forgot Password</RouterLink>

        <button
          type="submit"
          class="w-full btn rounded text-white bg-amber-900 mt-2 hover:bg-amber-700 hover:text-white transition-all duration-500 ease-in-out"
        >
          Sign In
        </button>
      </form>

      <p class="text-center font-light">
        Don't have an account?
        <RouterLink to="/" class="font-secondary font-bold underline">Sign Up</RouterLink>
      </p>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const showPassword = ref(false)

const payload = reactive({
  email: '',
  password: '',
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSignin = () => {
  console.log('-->', payload)
}
</script>
