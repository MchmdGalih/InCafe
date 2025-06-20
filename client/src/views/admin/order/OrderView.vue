<template>
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
import { useOrderStore } from '@/stores/order'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { computed, onMounted } from 'vue'

const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)
const keyword = ref('')

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

const fetchOrder = async () => {
  try {
    await orderStore.fetchAllOrder()
  } catch (error) {
    console.log(error, 'error di component')
  }
}

onMounted(() => fetchOrder())
</script>
