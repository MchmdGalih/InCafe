<template>
  <dialog ref="modalRef" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ props.title }}</h3>
      <div class="flex flex-col gap-y-2" v-if="props.titleBtn !== 'Delete'">
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
      </div>
      <div class="modal-action">
        <form method="dialog " class="space-x-4">
          <button :class="classBtn" @click.prevent="sendEmits">{{ props.titleBtn }}</button>
          <button class="btn btn-outline" @click.prevent="handleClose">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { computed, ref } from 'vue'

const modalRef = ref('')
const props = defineProps({
  title: {
    type: String,
  },

  titleBtn: {
    stype: String,
    default: 'Ok',
  },

  typeAction: {
    type: String,
  },

  placeholder: {
    type: String,
  },
})

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

const model = defineModel('name')
const emits = defineEmits(['send-submit'])

const v$ = useVuelidate(
  {
    name: { required },
  },
  { name: model },
)
const openModal = () => {
  modalRef.value?.showModal()
}

const handleClose = () => {
  modalRef.value?.close()
}

defineExpose({ openModal, handleClose })

const sendEmits = () => {
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

  modalRef.value?.close()
}
</script>
