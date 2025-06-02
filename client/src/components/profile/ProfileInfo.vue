<template>
  <section class="rounded-md flex flex-row gap-x-2">
    <div class="w-fit h-full flex p-2 rounded-md shadow-md flex-col items-center gap-2 border">
      <div
        class="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden relative flex justify-content-center items-center"
      >
        <div
          v-if="!props.preview"
          class="w-full h-full bg-amber-700 text-4xl text-white flex justify-center items-center text-uppercase"
        >
          <h1>{{ props.user.username[0] }}</h1>
        </div>
        <img :src="props.preview" alt="img-profile" class="w-full h-full object-cover" v-else />
        <div
          class="absolute top-8 right-4 cursor-pointer text-white/80 mix-blend-difference md:right-2"
        >
          <label v-if="!props.payloadImage" for="profile-img" class="cursor-pointer">
            <font-awesome-icon icon="fa-solid fa-camera" size="lg" />
          </label>
          <button @click="removeFile" v-else for="profile-img" class="cursor-pointer text-red-200">
            <font-awesome-icon icon="fa-solid fa-xmark" size="lg" />
          </button>
          <input
            type="file"
            id="profile-img"
            name="profile-img"
            class="hidden"
            @change="uploadImage"
          />
        </div>
      </div>

      <div class="badge badge-outline badge-success">{{ props.user.role }}</div>
    </div>
    <div class="border rounded-md shadow-md w-full">
      <div class="p-2 w-fit">
        <h1 class="font-secondary font-medium border-b-2">Bio & other details.</h1>

        <div class="max-w-max py-2">
          <div>
            <span class="w-16 sm:w-24 inline-flex justify-between">
              Username
              <span>:</span> </span
            >&nbsp;{{ props.user.username }}
          </div>

          <div>
            <span class="w-16 sm:w-24 inline-flex justify-between">
              Email
              <span>:</span> </span
            >&nbsp;{{ props.user.email }}
          </div>
          <div v-if="props.profile">
            <span class="w-16 sm:w-24 inline-flex justify-between">
              Phone
              <span>:</span> </span
            >&nbsp; {{ props.profile.phoneNumber }}
          </div>
          <div v-else>
            <span class="w-16 sm:w-24 inline-flex justify-between">
              Phone
              <span>:</span> </span
            >&nbsp; -
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// const props = defineProps(['preview', 'payloadImage', 'user'])
const props = defineProps({
  preview: String,
  payloadImage: File,
  user: Object,
  profile: Object,
})
const emits = defineEmits(['upload-image', 'remove-image'])
console.log('user', props.profile)

const uploadImage = (e) => {
  let file = e.target.files[0]

  const reader = new FileReader()

  reader.onload = () => {
    emits('upload-image', file, reader.result)
  }
  reader.onerror = () => {
    console.error('Error reading file:', reader.error)
  }
  reader.readAsDataURL(file)
}

const removeFile = () => {
  emits('remove-image')
}
</script>
