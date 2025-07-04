<template>
  <DeleteModal
    ref="modalRef"
    :title="configModal.title"
    :titleBtn="configModal.btnTitle"
    :typeAction="configModal.typeAction"
    @send-submit="handlerConfirmModal"
  />
  <div class="space-y-5">
    <h1 class="px-4 text-2xl font-secondary font-bold">Order Management</h1>

    <section class="p-4 flex gap-2 justify-between items-center">
      <Search classSearch="w-[400px]" @handle-search="handleSearch" />
    </section>

    <section class="px-4">
      <EasyDataTable
        :headers="headers"
        :items="dataOrders"
        table-class-name="customize-table"
        :rows-items="[8, 12]"
        :rows-per-page="8"
      >
        <template #item-status="{ status }">
          <span :class="status === 'pending' ? 'text-warning' : 'text-success'">
            {{ status }}
          </span>
        </template>
        <template #item-action="item">
          <div class="gap-x-2 inline-flex">
            <RouterLink to="/" type="button" class="btn btn-circle btn-info btn-sm">
              <font-awesome-icon icon="fa-solid fa-eye" />
            </RouterLink>

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
import Search from '@/components/landing/Search.vue'
import DeleteModal from '@/components/modal/ModalConfirm.vue'
import { useOrderStore } from '@/stores/order'
import { toast } from 'vue3-toastify'
import { storeToRefs } from 'pinia'
import { ref, shallowReactive } from 'vue'
import { computed, onMounted } from 'vue'

const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)
const modalRef = ref('')
const keyword = ref('')
const orderId = ref('')

const headers = [
  { text: 'Order ID', value: 'midtransOrderId' },
  { text: 'Status', value: 'status' },
  { text: 'Produk', value: 'productNames' },
  { text: 'Username', value: 'username' },
  { text: 'Aksi', value: 'action' },
]

const handleSearch = (value) => {
  keyword.value = value
}

const configModal = shallowReactive({
  typeAction: '',
  title: '',
  btnTitle: '',
})

const dataOrders = computed(() => {
  return orders.value
    .map((order) => ({
      id: order.id,
      midtransOrderId: order.midtransOrderId,
      status: order.status,
      productNames: order.Order_Items.map((item) => item.Product.name),
      username: order.User.username,
    }))
    .filter((order) => order.username.toLowerCase().includes(keyword.value.toLowerCase()))
})

const showModal = (mode, item) => {
  if (mode === 'isDelete') {
    orderId.value = item.id
    Object.assign(configModal, {
      typeAction: 'isDelete',
      title: 'Delete Order',
      btnTitle: 'Delete',
    })
  }

  modalRef.value.openModal()
}

const handlerDeleteOrder = async () => {
  try {
    await orderStore.deleteOrder(orderId.value)
    toast.success('Success delete order')
  } catch (error) {
    toast.error('Failed delete order')
  }
}

const handlerConfirmModal = async (data) => {
  if (data.isDelete) {
    const success = await handlerDeleteOrder()
    if (success) {
      await fetchOrder()
    }
  }
}

const fetchOrder = async () => {
  try {
    await orderStore.fetchAllOrder()
  } catch (error) {
    console.log(error, 'error di component')
  }
}

onMounted(() => fetchOrder())
</script>
