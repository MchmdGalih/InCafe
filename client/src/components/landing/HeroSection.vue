<template>
  <div
    class="h-screen grid grid-rows-3 bg-[url('@/assets/image/coffe-bg.png')] bg-no-repeat bg-center lg:px-16 md:px-8 px-4"
  >
    <section class="w-full flex items-center font-secondary">
      <div
        class="py-4 lg:w-60 md:w-60 lg:text-center md:text-start text-center flex flex-col gap-2"
      >
        <h1 class="text-4xl font-extrabold">$ 9.99</h1>

        <h4 class="font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, possimus.
        </h4>
      </div>
    </section>
    <section class="w-full flex items-center font-primary">
      <div class="grid grid-cols-2">
        <h1
          class="text-start font-extrabold lg:text-8xl md:text-6xl text-4xl md:-z-10 -z-10 max-w-sm"
        >
          WELCOME THE
        </h1>
        <h1 class="text-end font-extrabold lg:text-8xl md:text-6xl text-4xl md:-z-10 -z-10">
          TO COFFEE INCAFE
        </h1>
      </div>
    </section>
    <section class="w-full flex lg:flex-row md:flex-row flex-col items-center py-4">
      <div
        class="lg:w-56 w-full p-4 flex flex-col lg:bg-white md:bg-white bg-white/50 backdrop-blur-sm rounded-2xl text-center gap-2"
      >
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, dignissimos.</h1>
        <div
          class="p-2 rounded-md flex justify-center items-center gap-2 cursor-pointer hover:bg-amber-950 hover:text-white transition-all duration-500 ease-in-out shadow-md shadow-amber-950"
        >
          <button class="cursor-pointer font-bold">ORDER NOW</button>
          <span class="p-2 text-center">
            <font-awesome-icon icon="fa-solid fa-arrow-right " size="xl"></font-awesome-icon>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>
