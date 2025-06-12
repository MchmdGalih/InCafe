<template>
  <ModalCategory
    ref="modalRef"
    placeholder="category..."
    :title="configModal.title"
    :titleBtn="configModal.btnTitle"
    :typeAction="configModal.typeAction"
    v-model:name="categoryName"
    @send-submit="handlerConfirmModal"
  />
  <div class="flex flex-col gap-y-2">
    <h1 class="px-4 text-2xl font-secondary font-bold">Categories Management</h1>
    <section class="p-4 flex gap-2 justify-between items-center">
      <Search classSearch="w-[400px]" @handle-search="handleSearch" />
      <button
        type="button"
        id="btnAdd"
        class="btn btn-primary w-24"
        @click="handlerShowModal('isAdd')"
      >
        Add
      </button>
    </section>

    <section class="px-4">
      <EasyDataTable :headers="headers" :items="categoriesData" table-class-name="customize-table">
        <template #item-name="{ name }">
          <span class="capitalize">{{ name }}</span>
        </template>
        <template #item-action="item">
          <div class="gap-x-2 inline-flex">
            <button
              type="button"
              class="btn btn-circle btn-warning btn-sm"
              @click="handlerShowModal('isEdit', item)"
            >
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </button>
            <button
              type="button"
              class="btn btn-circle btn-error btn-sm"
              @click="handlerShowModal('isDelete', item)"
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
import ModalCategory from '@/components/modal/ModalConfirm.vue'
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { nextTick } from 'vue'
import { computed, ref, shallowReactive } from 'vue'
import { toast } from 'vue3-toastify'
const categoryStore = useCategoriesStore()
const { categories } = storeToRefs(categoryStore)

const modalRef = ref('')
const categoryName = ref('')
const categoryId = ref(null)
const keyword = ref('')

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

const categoriesData = computed(() => {
  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(keyword.value.toLowerCase()),
  )
})

const configModal = shallowReactive({
  typeAction: '',
  title: '',
  btnTitle: '',
})

const handlerShowModal = async (mode, item = '') => {
  switch (mode) {
    case 'isAdd':
      categoryName.value = ''
      Object.assign(configModal, {
        typeAction: 'isAdd',
        title: 'Add Category',
        btnTitle: 'Add',
      })
      break
    case 'isEdit':
      categoryName.value = item.name
      categoryId.value = item.id
      Object.assign(configModal, {
        typeAction: 'isEdit',
        title: 'Edit Category',
        btnTitle: 'Update',
      })
      break
    case 'isDelete':
      categoryId.value = item.id
      Object.assign(configModal, {
        typeAction: 'isDelete',
        title: 'Delete Category',
        btnTitle: 'Delete',
      })
      break
    default:
      break
  }
  await nextTick()
  modalRef.value.openModal()
}

const handlerAddCategory = async () => {
  try {
    await categoryStore.addCategory({
      name: categoryName.value,
    })
    toast.success('Success add category')
  } catch (error) {
    toast.error(error.message)
  }
}

const handlerUpdateCategory = async () => {
  try {
    await categoryStore.updateCategory(categoryId.value, {
      name: categoryName.value,
    })
    toast.success('Success update category')
  } catch (error) {
    toast.error(error.message)
  }
}

const handlerDeleteCategory = async () => {
  try {
    await categoryStore.deleteCategory(categoryId.value)
    toast.success('Success delete category')
  } catch (error) {
    toast.error(error.message)
  }
}

const handlerConfirmModal = async (data) => {
  switch (true) {
    case data.isAdd:
      await handlerAddCategory()
      break
    case data.isEdit:
      await handlerUpdateCategory()
      break
    case data.isDelete:
      await handlerDeleteCategory()
      break
  }

  await categoryStore.getAllCategories()
}
</script>
