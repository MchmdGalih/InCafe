<template>
  <div class="w-screen grid lg:grid-cols-2 gap-4 lg:py-12 py-8 px-16">
    <section class="space-y-2 order-2 lg:order-1">
      <div class="w-full">
        <h1
          class="capitalize font-secondary lg:text-6xl md:text-6xl text-2xl font-bold bg-gradient-to-r from-[#f4b572] to-[#985104] bg-clip-text text-transparent lg:text-start text-center"
        >
          Fuel Your Day, One Cup at a Time
        </h1>
      </div>

      <div class="lg:py-4 py-2 lg:text-start text-center">
        <p class="lg:text-2xl md:text-md font-secondary font-light">
          Elevete your productivity & build your mood with a glass of coffee in the morning & we're
          always ready to serve with absolutely the best quality coffee.
        </p>
      </div>
      <div class="space-x-4 font-secondary flex lg:justify-start justify-center items-center">
        <button
          class="border text-black py-2 px-8 rounded-full shadow-2xl cursor-pointer hover:bg-amber-900 hover:text-white transition-all duration-500 ease-in-out"
        >
          Login
        </button>
        <button
          class="bg-soft-white py-2 px-4 rounded-full cursor-pointer hover:bg-amber-900 hover:text-white transition-all duration-500 ease-in-out"
        >
          Order Now
        </button>
      </div>
    </section>
    <section
      class="relative order-1 lg:order-2 lg:col-start-2 col-start-1 flex justify-center items-center"
    >
      <div>
        <article class="lg:w-96 lg:h-80 md:w-72 md:h-72 w-48 h-48">
          <img :src="coffee" alt="coffee" class="w-full h-full object-cover" />
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import coffee from '@/assets/image/coffe-bg.png'
</script>
