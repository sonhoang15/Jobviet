<template>
  <section class="bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-100 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Tìm việc làm <span class="text-primary-600">IT</span> tốt nhất
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Kết nối với hàng nghìn cơ hội việc làm từ các công ty công nghệ hàng đầu
        </p>
      </div>

      <!-- Search Bar -->
      <SearchBar @search="handleSearch" />

      <!-- Quick Stats -->
      <div class="flex justify-center items-center space-x-8 mt-8 text-sm text-gray-600">
        <NuxtLink to="/jobs" class="text-blue-600 font-bold underline">
          {{ totalJobs }}+ việc làm
        </NuxtLink>
        <span>Cập nhật hàng ngày</span>
      </div>

      <JobsList />
    </div>
  </section>
</template>

<script setup lang="ts">
import JobsList from '@/components/JobsList.vue'
import { useJobs } from '@/composables/useJobs'

const { fetchJobs } = useJobs()
const totalJobs = ref(0)
const companies = ref<any[]>([])

onMounted(async () => {
  const res = await fetchJobs()
  totalJobs.value = res.length // ✅ res là []
})

onMounted(async () => {
  const res = await fetchJobs()
  companies.value = res.map((item: any) => item.company) || [] // ✅ map trực tiếp
})


// tạm thời search ở trang chủ chỉ log ra
const handleSearch = (filters: any) => {
  console.log('Search filters:', filters)
}
</script>