<template>
  <div class="w-screen h-screen flex justify-center items-center px-8">
    <section class="max-w-max px-8 py-4 flex flex-col gap-2">
      <font-awesome-icon
        icon="fa-solid fa-coffee"
        size="xl"
        class="text-amber-900"
      ></font-awesome-icon>

      <div class="text-center font-secondary space-y-2">
        <h1 class="font-extrabold text-4xl">Log in to your account</h1>
        <p class="font-light">Welcome back! Please enter your details.</p>
      </div>

      <form class="p-2">
        <div class="flex flex-col mb-2">
          <label for="email" class="font-secondary font-bold"> Email </label>

          <input
            type="text"
            name="email"
            id="name"
            placeholder="Enter your password"
            class="border rounded p-2"
          />
        </div>

        <div class="flex flex-col mb-2">
          <label for="password" class="font-secondary font-bold"> Password </label>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            class="border font-secondary rounded p-2"
          />
        </div>

        <RouterLink to="/" class="font-secondary underline">Forgot Password</RouterLink>

        <button
          class="w-full btn rounded text-white bg-amber-900 mt-2 hover:bg-amber-700 hover:text-white transition-all duration-500 ease-in-out"
        >
          Sign In
        </button>
      </form>

      <p class="text-center">
        Don't have an account?
        <RouterLink to="/" class="font-secondary underline">Sign Up</RouterLink>
      </p>
    </section>
  </div>
</template>
