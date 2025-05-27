<template>
  <MainLayout>
    <template #content>
      <HeroSection />
      <ProductSection />
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/mainLayout.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import ProductSection from '@/components/landing/ProductSection.vue'

import { onMounted } from 'vue'
import { toast } from 'vue3-toastify'

onMounted(() => {})
if (history.state.isSuccess) {
  toast.success('Login success', {
    onClose: () => {
      history.replaceState(null, '')
    },
  })
}
</script>
