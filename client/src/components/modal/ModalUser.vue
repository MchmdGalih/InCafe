<template>
  <dialog ref="modalRef" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold mb-2">Form User</h3>
      <!-- <div class="flex flex-col gap-y-2" v-if="props.titleBtn !== 'Delete'">
        <label for="category" class="text-sm">Name</label>
        <input
          type="text"
          class="input focus:outline-none"
          :placeholder="props.placeholder"
          v-model="model"
        />
        <small v-if="v$.name.$error" v-for="error in v$.name.$errors" class="text-red-700 text-xs">
          {{ error.$message }}
        </small>
      </div>
      <div v-else>
        <p>Apakah anda yakin ingin menghapus data ini ?</p>
      </div> -->
      <!-- <div class="modal-action">
        <form method="dialog " class="space-x-4">
          <button :class="classBtn" @click.prevent="sendEmits">{{ props.titleBtn }}</button>
          <button class="btn btn-outline" @click.prevent="handleClose">Close</button>
        </form>
      </div> -->
      <form @submit.prevent="handleSubmit" class="space-y-3">
        <template v-if="typeAction === 'isAdd' || typeAction === 'isEdit'">
          <div>
            <label for="username" class="mb-1">Username</label>
            <input
              v-model="formData.username"
              placeholder="Username"
              type="text"
              name="username"
              id="username"
              class="input input-bordered w-full"
            />
            <small
              v-if="v$.username.$error"
              v-for="error in v$.username.$errors"
              class="text-red-700 text-xs"
            >
              {{ error.$message }}
            </small>
          </div>
          <div>
            <label for="email" class="mb-1">Email</label>
            <input
              v-model="formData.email"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              class="input input-bordered w-full"
            />
            <small
              v-if="v$.email.$error"
              v-for="error in v$.email.$errors"
              class="text-red-700 text-xs"
            >
              {{ error.$message }}
            </small>
          </div>

          <div>
            <label for="password" class="mb-1">Password</label>
            <input
              v-model="formData.password"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              class="input input-bordered w-full"
            />
            <small
              v-if="v$.password.$error"
              v-for="error in v$.password.$errors"
              class="text-red-700 text-xs"
            >
              {{ error.$message }}
            </small>
          </div>

          <div>
            <select class="select select-primary w-full" v-model="formData.roleId">
              <option disabled value="">Pilih Role</option>
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name }}
              </option>
            </select>
            <small
              v-if="v$.roleId.$error"
              v-for="error in v$.email.$errors"
              class="text-red-700 text-xs"
            >
              {{ error.$message }}
            </small>
          </div>
        </template>
        <template v-else>
          <div>
            <p>Apakah anda yakin ingin menghapus user ini ?</p>
          </div>
        </template>
        <div class="modal-action">
          <button type="submit" :class="classBtn">{{ props.titleBtn }}</button>
          <button type="button" class="btn" @click="handleClose">Batal</button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import { useRoleStore } from '@/stores/roles'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  titleBtn: {
    type: String,
  },

  typeAction: {
    type: String,
  },
})

const emits = defineEmits(['send-submit'])

const roleStore = useRoleStore()
const { roles } = storeToRefs(roleStore)

const modalRef = ref('')
const formData = defineModel('formData')

const rules = computed(() => ({
  username: { required },
  email: { required, email },
  password: props.typeAction === 'isEdit' ? {} : { required, minLength: minLength(6) },
  roleId: { required },
}))

const classBtn = computed(() => {
  switch (props.typeAction) {
    case 'isAdd':
      return 'btn btn-success'
    case 'isEdit':
      return 'btn btn-warning'
    case 'isDelete':
      return 'btn btn-error'
    default:
      return 'btn'
  }
})

const v$ = useVuelidate(rules, formData)

const openModal = () => {
  modalRef.value?.showModal()
}

const handleClose = () => {
  modalRef.value?.close()
}

defineExpose({ openModal, handleClose })
const handleGetRoles = async () => {
  try {
    await roleStore.getAllRole()
  } catch (error) {
    console.log(error)
  }
}

const handleSubmit = () => {
  const validateType = props.typeAction === 'isAdd' || props.typeAction === 'isEdit'
  if (validateType) {
    v$.value.$touch()
    const invalid = v$.value.$invalid
    if (invalid) return
  }

  switch (props.typeAction) {
    case 'isAdd':
      emits('send-submit', { isAdd: true })
      break
    case 'isEdit':
      emits('send-submit', { isEdit: true })
      break
    case 'isDelete':
      emits('send-submit', { isDelete: true })
      break
    default:
      break
  }
  handleClose()
}

onMounted(() => handleGetRoles())
</script>
