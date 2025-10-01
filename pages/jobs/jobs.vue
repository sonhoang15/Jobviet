<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-bold text-gray-900">Tất cả việc làm</h2>
      <span class="text-gray-600">{{ filteredJobs.length }} việc làm</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <NuxtLink
        v-for="job in paginatedJobs"
        :key="job.id"
        :to="`/jobs/${job.id}`"
        class="block hover:no-underline"
      >
        <JobCard :job="job" />
      </NuxtLink>
    </div>


    <div
      v-if="totalPages > 1"
      class="flex justify-center items-center space-x-2 mt-12"
    >
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
        class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Trước
      </button>
      
 
      <button
        v-for="page in pageNumbers"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-4 py-2 border rounded-md',
          currentPage === page 
            ? 'bg-primary-500 text-white border-primary-500' 
            : 'border-gray-300 hover:bg-gray-50'
        ]"
      >
        {{ page }}
      </button>
      
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sau
      </button>
    </div>


    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Đang tải việc làm...</p>
    </div>


    <div v-else-if="!loading && filteredJobs.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">Không tìm thấy việc làm</h3>
      <p class="mt-2 text-gray-500">Hiện tại không có việc làm nào phù hợp.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJobs, mapJobData } from '@/composables/useJobs'

const { fetchJobs, loading, error } = useJobs()
const allJobs = ref<any[]>([])
const filteredJobs = ref<any[]>([])
const currentPage = ref(1)
const pageSize = 10

const totalPages = computed(() =>
  Math.ceil(filteredJobs.value.length / pageSize)
)

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredJobs.value.slice(start, start + pageSize)
})

const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: number[] = []
  
  
  let startPage = Math.max(1, current - 2)
  let endPage = Math.min(total, current + 2)
  

  if (current <= 3) {
    endPage = Math.min(5, total)
  }
  if (current >= total - 2) {
    startPage = Math.max(1, total - 4)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

onMounted(async () => {
  try {
    const jobsData = await fetchJobs()
    console.log('Jobs API response:', jobsData)
    

    const jobs = Array.isArray(jobsData) 
      ? jobsData.map(job => mapJobData(job))
      : []
    
    allJobs.value = jobs
    filteredJobs.value = jobs
  } catch (err) {
    console.error('Fetch jobs error:', err)
  }
})


watch(filteredJobs, () => {
  currentPage.value = 1
})


useSeoMeta({
  title: 'Tất cả việc làm IT - Tìm kiếm công việc mơ ước',
  description: 'Khám phá hàng ngàn việc làm IT chất lượng. Tìm kiếm công việc phù hợp với kỹ năng và kinh nghiệm của bạn.',
  ogTitle: 'Tất cả việc làm IT - Tìm kiếm công việc mơ ước',
  ogDescription: 'Khám phá hàng ngàn việc làm IT chất lượng. Tìm kiếm công việc phù hợp với kỹ năng và kinh nghiệm của bạn.',
})
</script>