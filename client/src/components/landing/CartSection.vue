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
            <input
              type="checkbox"
              name="checkbox"
              class="checkbox"
              :checked="product.selected"
              @change="handleToggleChecked(product.id)"
            />
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
              <p class="font-secondary text-red-400 font-bold">
                {{ formatToIdr(product.price * product.qty) }}
              </p>
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
        <p class="font-secondary font-bold text-xl text-end mb-2 border-b-2">
          Total: {{ formatToIdr(totalPrice) }}
        </p>
        <button
          class="btn btn-md btn-success text-white w-full"
          @click="handleOrder"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading loading-spinner text-white"></span>
          <span v-else>Checkout ({{ selectedCount }})</span>
        </button>
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
import { payWithMidtrans } from '@/services/midtransService'
import { useAuthStore } from '@/stores/auth'
import { useStoreCart } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
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
const orderStore = useOrderStore()
const { carts } = storeToRefs(cartStore)
const authStore = useAuthStore()
const profileStore = useProfileStore()
const { currentUser, isAuthenticated } = storeToRefs(authStore)
const { profile } = storeToRefs(profileStore)

const isLoading = ref(false)

const handleToggleChecked = (productId) => {
  const product = carts.value.find((item) => item.id === productId)
  if (product) {
    product.selected = !product.selected
  }
}

const totalPrice = computed(() => {
  const subTotal = carts.value
    .filter((item) => item.selected)
    .reduce((acc, curr) => acc + curr.price * curr.qty, 0)
  return subTotal
})

const selectedCount = computed(() => carts.value.filter((item) => item.selected).length)

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

const handleOrder = async () => {
  const selectedItem = carts.value.filter((item) => item.selected)

  if (selectedItem.length === 0) {
    toast.warning('Please select at least one item.')
    return
  }

  if (!isAuthenticated) {
    toast.warning('Please login before ordering.')
    return
  }

  if (!profile.value) {
    toast.warning('Please complete your profile before ordering.')
    return
  }

  const payload = {
    userId: currentUser.value.id,
    total_amount: totalPrice.value,
    items: selectedItem.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.qty,
    })),
    firstName: profile.value.firstName,
    lastName: profile.value.lastName,
    email: currentUser.value.email,
    phoneNumber: profile.value.phoneNumber,
  }

  try {
    isLoading.value = !isLoading.value
    const { snapToken } = await orderStore.createOrder(payload)

    payWithMidtrans(snapToken, {
      onSuccess: () => {
        cartStore.clearCarts()
        carts.value = carts.value.filter((item) => !item.selected)
        toast.success('Payment success!')
      },
    })
  } catch (error) {
    console.log('error', error)
  } finally {
    isLoading.value = !isLoading.value
  }
}
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
