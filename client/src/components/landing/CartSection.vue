<template>
  <Transition name="slide-fade">
    <div
      v-if="isShowCart"
      class="fixed bg-white/30 backdrop-blur-sm w-full h-[90dvh] max-sm:h-[90vh] flex flex-col z-30 box-border items-end overflow-y-auto hide-scrollbar"
    >
      <div
        class="w-full flex justify-between items-center lg:max-w-2/5 md:w-2/4 p-4 text-xl text-white font-primary bg-amber-800"
      >
        <h1>Your carts</h1>

        <button @click="$emit('close-cart')" class="cursor-pointer rounded-full btn">X</button>
      </div>

      <section
        class="bg-white shadow-xl w-full flex flex-col gap-2 p-2 lg:w-2/5 sm:w-2/4 h-full overflow-y-auto hide-scrollbar"
        v-if="carts.length > 0"
      >
        <div
          class="w-full flex border-b-2 items-center py-4 px-2 gap-2 flex-row relative"
          v-for="product in carts"
          :key="product.id"
        >
          <button
            class="cursor-pointerc btn btn-ghost btn-circle absolute right-2 top-2 z-10"
            type="button"
            @click="handleRemoveCarts(product.id)"
          >
            <font-awesome-icon icon="fa-solid fa-trash" size="xl" class="text-red-600" />
          </button>
          <div class="flex items-center gap-x-2">
            <input type="checkbox" name="checkbox" class="checkbox" />
            <figure class="w-24 h-24">
              <img
                :src="product.image_cover"
                :alt="product.name"
                class="w-full h-full object-cover rounded-md"
              />
            </figure>
          </div>
          <div class="w-full flex flex-col p-2">
            <h2 class="font-bold font-secondary">{{ product.name }}</h2>
            <div class="flex items-center justify-between">
              <p class="font-secondary text-red-400 font-bold">{{ formatToIdr(totalPriceItem) }}</p>
              <div class="flex items-center bg-gray-300 rounded-md p-2">
                <button class="p-1 cursor-pointer" @click="handleDecrementQty(product.id)">
                  -
                </button>
                <p class="px-2">{{ product.qty }}</p>
                <button class="p-1 cursor-pointer" @click="handleIncrementQty(product.id)">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div v-if="carts.length !== 0" class="sticky bottom-0 w-full lg:w-2/5 sm:w-2/4 bg-white p-4">
        <button class="btn btn-md btn-neutral w-full">Checkout</button>
      </div>
      <section
        v-else
        class="bg-white shadow-xl w-full h-full flex flex-col overflow-y-auto scroll-smooth gap-2 p-2 hide-scrollbar lg:w-2/5 sm:w-2/4 items-center justify-center"
      >
        <img src="@/assets/image/empty-cart.svg" alt="empty-cart" />
        <p class="font-secondary font-bold text-2xl">Oops cart is empty</p>
      </section>
    </div>
  </Transition>
</template>

<script setup>
import { formatToIdr } from '@/services/formatRp'
import { useStoreCart } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { toast } from 'vue3-toastify'

defineProps({
  isShowCart: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['close-cart'])

const cartStore = useStoreCart()
const { carts } = storeToRefs(cartStore)

const handleIncrementQty = (productId) => {
  cartStore.increaseQty(productId)
}

const handleDecrementQty = (productId) => {
  cartStore.decreaseQty(productId)
}
const handleRemoveCarts = (productId) => {
  cartStore.removeCart(productId)
  toast.success('Product removed from cart')
}

const totalPriceItem = computed(() => {
  return carts.value.reduce((total, product) => total + product.price * product.qty, 0)
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
