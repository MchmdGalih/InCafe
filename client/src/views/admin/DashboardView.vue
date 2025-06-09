<template>
  <div class="space-y-5">
    <h1 class="font-secondary text-2xl font-bold">Dashboard</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4">
      <div class="rounded-md p-6 shadow bg-white" v-for="(item, i) in cardData" :key="i">
        <span class="flex justify-between items-center mb-1">
          <h2 class="font-secondary font-medium">{{ item.title }}</h2>
          <font-awesome-icon :icon="item.icon" size="xl" class="text-amber-900" />
        </span>
        <p class="lg:text-2xl text-xl font-bold font-secondary">{{ item.desc }}</p>
      </div>
    </div>

    <div class="bg-white p-4 rounded-md">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'

const cardData = [
  {
    title: 'Total Order',
    desc: '5,000',
    icon: 'fa-solid fa-cart-shopping',
  },

  {
    title: 'Total Revenue',
    desc: 'Rp. 150.000.000,00',
    icon: 'fa-solid fa-money-bill-trend-up',
  },
  {
    title: 'Product Sold',
    desc: '846',
    icon: 'fa-solid fa-cube',
  },
]
const chartData = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'Mai',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      label: 'Sales per month',
      backgroundColor: '#f59e0b',
      data: [40, 20, 12, 17, 91, 100, 150, 49, 7, 10, 28, 72],
    },
  ],

  options: {
    responsive: true,
  },
}
</script>
