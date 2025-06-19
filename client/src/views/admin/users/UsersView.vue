<template>
  <ModalUser
    ref="modalRef"
    v-model:formData="formData"
    :titleBtn="configModal.titleBtn"
    :typeAction="configModal.typeAction"
    @send-submit="handleSubmit"
  />
  <div class="space-y-5">
    <h1 class="px-4 text-2xl font-secondary font-bold">Users Management</h1>
    <section class="p-4 flex gap-2 justify-between items-center">
      <Search classSearch="w-[400px]" @handle-search="handleSearch" />
      <button type="button" id="btnAdd" class="btn btn-primary w-24" @click="showModal('isAdd')">
        Add
      </button>
    </section>

    <section class="px-4">
      <EasyDataTable :headers="headers" :items="userData" table-class-name="customize-table">
        <template #item-name="{ username }">
          <span class="capitalize">{{ username }}</span>
        </template>
        <template #item-action="item">
          <div class="gap-x-2 inline-flex">
            <RouterLink
              :to="{ name: 'dashboard-user-detail', params: { id: item.id } }"
              type="button"
              class="btn btn-circle btn-info btn-sm"
            >
              <font-awesome-icon icon="fa-solid fa-eye" />
            </RouterLink>
            <button type="button" class="btn btn-circle btn-warning btn-sm">
              <font-awesome-icon
                icon="fa-solid fa-pen-to-square"
                @click="showModal('isEdit', item)"
              />
            </button>
            <button
              type="button"
              class="btn btn-circle btn-error btn-sm"
              @click="showModal('isDelete', item)"
            >
              <font-awesome-icon icon="fa-solid fa-trash " />
            </button>
          </div> </template
      ></EasyDataTable>
    </section>
  </div>
</template>

<script setup>
import ModalUser from '@/components/modal/ModalUser.vue'
import Search from '@/components/landing/Search.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { nextTick, reactive, ref } from 'vue'
import { computed } from 'vue'
import { onMounted } from 'vue'
import { shallowReactive } from 'vue'
import { toast } from 'vue3-toastify'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)

const modalRef = ref('')
const keyword = ref('')
const userId = ref('')

const formData = reactive({
  username: '',
  email: '',
  password: '',
  roleId: '',
})

const handleSearch = (value) => {
  keyword.value = value
}

const headers = [
  {
    text: 'Username',
    value: 'username',
  },
  {
    text: 'Email',
    value: 'email',
  },

  {
    text: 'Role',
    value: 'name',
  },
  {
    text: 'Action',
    value: 'action',
  },
]

const userData = computed(() => {
  const user = users.value.filter((user) =>
    user.username.toLowerCase().includes(keyword.value.toLowerCase()),
  )
  return user
})

const configModal = shallowReactive({
  typeAction: '',
  titleBtn: '',
})

const showModal = async (mode, item = null) => {
  switch (mode) {
    case 'isAdd':
      Object.assign(configModal, {
        typeAction: 'isAdd',
        titleBtn: 'Add',
      })
      Object.assign(formData, {
        username: '',
        email: '',
        password: '',
        role: '',
      })
      break
    case 'isEdit':
      userId.value = item?.id
      Object.assign(configModal, {
        typeAction: 'isEdit',
        titleBtn: 'Update',
      })
      Object.assign(formData, {
        username: item?.username || '',
        email: item?.email || '',
        password: '',
        role: item?.roleId || '',
      })
      break
    case 'isDelete':
      userId.value = item.id
      Object.assign(configModal, {
        typeAction: 'isDelete',
        titleBtn: 'Delete',
      })
      break
  }
  await nextTick()
  modalRef.value?.openModal()
}

const handleGetUsers = async () => {
  try {
    await userStore.getAllUsers()
  } catch (error) {
    console.log(error)
  }
}

const createUser = async () => {
  const payload = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    role: formData.roleId,
  }
  try {
    await userStore.addUser(payload)
    toast.success('Success add user!')
  } catch (error) {
    toast.error('Failed add user!')
  }
}

const updateUser = async () => {
  const payload = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    role: formData.roleId,
  }
  try {
    await userStore.updateUser(userId.value, payload)
    toast.success('Success update user!')
  } catch (error) {
    toast.error('Failed update user!')
  }
}

const deleteUser = async () => {
  try {
    await userStore.deleteUser(userId.value)
    toast.success('Success delete user!')
  } catch (error) {
    toas.error('Failed delete user!')
  }
}

const handleSubmit = async (data) => {
  switch (true) {
    case data.isAdd:
      await createUser()
      break
    case data.isEdit:
      await updateUser()
      break
    case data.isDelete:
      await deleteUser()
      break
    default:
      break
  }

  await handleGetUsers()
}

onMounted(() => {
  handleGetUsers()
})
</script>
