<template>
  <div
    class="h-screen grid grid-rows-3 bg-[url('@/assets/image/coffe-bg.png')] bg-no-repeat bg-center px-16"
  >
    <section class="w-full flex items-center font-secondary">
      <div class="py-4 w-60 flex flex-col gap-2">
        <h1 class="text-4xl font-extrabold">$ 9.99</h1>

        <h4 class="font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, possimus.
        </h4>
      </div>
    </section>
    <section class="w-full flex items-center font-secondary">
      <div class="grid lg:grid-cols-2">
        <h1 class="text-start font-extrabold lg:text-8xl max-w-sm">WELCOME THE</h1>
        <h1 class="text-end font-extrabold lg:text-8xl">TO COFFEE INCAFE</h1>
      </div>
    </section>
    <section class="w-full py-4">
      <div class="w-56 flex flex-col gap-2">
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, dignissimos.</h1>
        <div
          class="bg-white max-w-44 p-2 border rounded-md flex justify-center items-center gap-2 cursor-pointer hover:bg-amber-950 hover:text-white transition-all duration-500 ease-in-out shadow-md"
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
