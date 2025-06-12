<template>
  <ModelRoles
    ref="modalRef"
    placeholder="role..."
    :title="configModal.title"
    :titleBtn="configModal.btnTitle"
    :typeAction="configModal.typeAction"
    v-model:name="roleName"
    @send-submit="handlerConfirmModal"
  />
  <div class="flex flex-col gap-y-2">
    <h1 class="px-4 text-2xl font-secondary font-bold">Roles Management</h1>
    <section class="p-4 flex gap-2 justify-between items-center">
      <Search classSearch="w-[400px]" @handle-search="handleSearch" />
      <button
        type="button"
        id="btnAdd"
        class="btn btn-primary w-24"
        @click="handleShowModal('isAdd')"
      >
        Add
      </button>
    </section>

    <section class="px-4">
      <EasyDataTable :headers="headers" :items="rolesData" table-class-name="customize-table">
        <template #item-name="{ name }">
          <span class="capitalize">{{ name }}</span>
        </template>
        <template #item-action="item">
          <div class="gap-x-2 inline-flex">
            <button
              type="button"
              class="btn btn-circle btn-error btn-sm"
              @click.prevent="handleShowModal('isDelete', item)"
            >
              <font-awesome-icon icon="fa-solid fa-trash " />
            </button>
          </div> </template
      ></EasyDataTable>
    </section>
  </div>
</template>

<script setup>
import Search from '@/components/landing/Search.vue'
import ModelRoles from '@/components/modal/ModalConfirm.vue'
import { useRoleStore } from '@/stores/roles'
import { storeToRefs } from 'pinia'
import { computed, nextTick, onMounted, ref, shallowReactive } from 'vue'
import { toast } from 'vue3-toastify'

const roleStore = useRoleStore()
const { roles } = storeToRefs(roleStore)
const roleName = ref('')
const roleId = ref('')
const keyword = ref('')
const modalRef = ref('')

const handleSearch = (value) => {
  keyword.value = value
}

const headers = [
  {
    text: 'Name',
    value: 'name',
  },
  {
    text: 'ID',
    value: 'id',
  },
  {
    text: 'Action',
    value: 'action',
  },
]

const rolesData = computed(() => {
  const result = roles.value.filter((role) =>
    role.name.toLowerCase().includes(keyword.value.toLowerCase()),
  )
  return result
})

const configModal = shallowReactive({
  typeAction: '',
  title: '',
  btnTitle: '',
})

const handleShowModal = async (mode, item = '') => {
  switch (mode) {
    case 'isAdd':
      roleName.value = ''
      Object.assign(configModal, {
        typeAction: 'isAdd',
        title: 'Roles',
        btnTitle: 'Add',
      })
      break

    case 'isDelete':
      roleId.value = item.id
      Object.assign(configModal, {
        typeAction: 'isDelete',
        title: 'Delete Role',
        btnTitle: 'Delete',
      })
      break
    default:
      break
  }
  await nextTick()
  modalRef.value?.openModal()
}

const handleGetAllRole = async () => {
  try {
    await roleStore.getAllRole()
  } catch (error) {
    toast.error(error.message)
  }
}

const handleAddRole = async () => {
  try {
    await roleStore.addRole({ name: roleName.value })
    toast.success('Success add role!')
  } catch (error) {
    toast.error('Failed add role')
  }
}

const handleDeleteRole = async () => {
  try {
    await roleStore.deleteRole(roleId.value)
    toast.success('Success delete Role!')
  } catch (error) {
    toast.error('Failed delete role')
  }
}

const handlerConfirmModal = async (data) => {
  switch (true) {
    case data.isAdd:
      await handleAddRole()
      break
    case data.isDelete:
      await handleDeleteRole()
      break
    default:
      break
  }

  await handleGetAllRole()
}

onMounted(() => {
  handleGetAllRole()
})
</script>
