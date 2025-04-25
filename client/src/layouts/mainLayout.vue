<script setup>
import Footer from '@/components/navigation/Footer.vue'
import Navbar from '@/components/navigation/Navbar.vue'
</script>
<template>
  <!-- NAVBAR -->
  <Navbar />

  <main>
    <slot name="content" />
  </main>

  <!-- FOOTER -->
  <Footer />
</template>
