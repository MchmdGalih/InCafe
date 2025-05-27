<template>
  <!-- NAVBAR -->
  <Navbar @toggle-cart="toggleCart" />
  <CartSection :is-show-cart="isShowCart" @close-cart="toggleCart" />
  <main>
    <slot name="content" />
  </main>

  <!-- FOOTER -->
  <Footer />
</template>

<script setup>
import Footer from '@/components/navigation/Footer.vue'
import Navbar from '@/components/navigation/Navbar.vue'
import CartSection from '@/components/landing/CartSection.vue'
import { ref } from 'vue'

const isShowCart = ref(false)

const toggleCart = () => {
  isShowCart.value = !isShowCart.value
}
</script>
