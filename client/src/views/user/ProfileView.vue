<template>
  <MainLayout>
    <template #content>
      <div class="w-screen h-96 lg:px-16 md:px-14 p-4">
        <div class="w-full h-full flex flex-col gap-4">
          <section class="space-y-1 border-b-2 border-dashed">
            <h1 class="font-primary text-4xl font-bold">Profile</h1>
            <p class="font-secondary mb-1 font-light">View all your profile details.</p>
          </section>

          <ProfileInfo
            :preview="previewImage"
            :payloadImage="payload.image"
            @upload-image="handleUploadImage"
            @remove-image="handleRemoveImage"
          />

          <section class="w-full border h-24">TEST</section>
        </div>
      </div>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/mainLayout.vue'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import { reactive, ref } from 'vue'

const previewImage = ref('')

const payload = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  image: '',
})

const handleUploadImage = (file, previewUrl) => {
  payload.image = file
  previewImage.value = previewUrl
}

const handleRemoveImage = () => {
  payload.image = ''
  previewImage.value = ''
}

const createOrUpdate = () => {
  console.log('test')
}
</script>
