<template>
  <MainLayout>
    <template #content>
      <HeroSection />
    </template>
  </MainLayout>
</template>

<script setup>
import HeroSection from '@/components/landing/HeroSection.vue'
import MainLayout from '@/layouts/mainLayout.vue'
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
