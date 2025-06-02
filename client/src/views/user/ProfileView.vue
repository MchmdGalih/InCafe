<template>
  <MainLayout>
    <template #content>
      <div class="w-screen lg:px-16 md:px-14 p-4">
        <div class="w-full h-full flex flex-col gap-4">
          <section class="space-y-1 border-b-2 border-dashed">
            <h1 class="font-primary text-4xl font-bold">Profile</h1>
            <p class="font-secondary mb-1 font-light">View all your profile details.</p>
          </section>

          <ProfileInfo
            :preview="previewImage"
            :user="currentUser"
            :profile="profile"
            :payloadImage="payload.image"
            @upload-image="handleUploadImage"
            @remove-image="handleRemoveImage"
          />

          <section class="w-full py-4 px-2">
            <h1 class="text-2xl font-primary mb-2 font-bold">Form Profile</h1>

            <form @submit.prevent="handleCreateOrUpdate" class="flex flex-col gap-y-2 space-y-2.5">
              <div>
                <label for="fname">First Name</label>
                <input
                  type="text"
                  class="input w-full"
                  id="fname"
                  name="fname"
                  v-model="payload.firstName"
                />
                <small
                  v-if="v$.firstName.$error"
                  v-for="error in v$.firstName.$errors"
                  class="text-red-600"
                >
                  {{ error.$message }}
                </small>
              </div>
              <div>
                <label for="fname">Last Name</label>
                <input
                  type="text"
                  class="input w-full"
                  id="lname"
                  name="lname"
                  v-model="payload.lastName"
                />
                <small
                  v-if="v$.lastName.$error"
                  v-for="error in v$.lastName.$errors"
                  class="text-red-600"
                >
                  {{ error.$message }}
                </small>
              </div>
              <div>
                <label for="phone">Phone Number</label>
                <input
                  type="number"
                  class="input w-full"
                  id="phone"
                  name="phone"
                  placeholder="08..."
                  maxlength="12"
                  v-model="payload.phoneNumber"
                  @input="phoneNumberValidate"
                />
                <small class="text-red-700" v-if="phoneError">
                  {{ phoneError }}
                </small>
              </div>

              <button
                :disabled="isLoading"
                type="submit"
                class="w-full btn rounded text-white bg-amber-900 mt-2 hover:bg-amber-700 hover:text-white transition-all duration-500 ease-in-out"
              >
                <span v-if="isLoading" class="loading loading-spinner text-white"></span>
                <span v-else>Update</span>
              </button>
            </form>
          </section>
        </div>
      </div>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/mainLayout.vue'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profile'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)
import { toast } from 'vue3-toastify'

const previewImage = ref('')
const phoneError = ref('')
const isLoading = ref(false)

const payload = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  image: '',
})

const rules = computed(() => ({
  firstName: { required },
  lastName: { required },
}))

const v$ = useVuelidate(rules, payload)

const phoneNumberValidate = () => {
  let regex = /^[0-9]{10,13}$/

  if (!regex.test(payload.phoneNumber)) {
    phoneError.value = 'Please input only number & max length 12'
    return false
  }
  phoneError.value = ''
  return payload.phoneNumber
}

const handleUploadImage = (file, previewUrl) => {
  payload.image = file
  previewImage.value = previewUrl
}

const handleRemoveImage = () => {
  payload.image = ''
  previewImage.value = ''
}

const handleCreateOrUpdate = async () => {
  v$.value.$touch()
  if (v$.value.$error) return
  isLoading.value = !isLoading.value
  try {
    const formData = new FormData()
    formData.append('firstName', payload.firstName)
    formData.append('lastName', payload.lastName)
    formData.append('phoneNumber', payload.phoneNumber)

    if (payload.image) {
      formData.append('image', payload.image)
    }
    await profileStore.createOrUpdate(currentUser.value.id, formData)
    toast.success('Success update or create profile')
  } catch (error) {
    toast.error(error)
  } finally {
    await handleGetProfile()
    payload.image = ''
    isLoading.value = !isLoading.value
  }
}

const handleGetProfile = async () => {
  try {
    const response = await profileStore.getProfile(currentUser.value.id)
    previewImage.value = response.data?.image

    Object.assign(payload, {
      firstName: response.data?.firstName,
      lastName: response.data?.lastName,
      phoneNumber: response.data?.phoneNumber,
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  handleGetProfile()
})
</script>
