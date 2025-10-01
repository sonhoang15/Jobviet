<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-bold text-gray-900">Tất cả việc làm</h2>
      <span class="text-gray-600">{{ filteredJobs.length }} việc làm</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <NuxtLink
        v-for="job in paginatedJobs"
        :key="job._id"
        :to="`/jobs/${job._id}`"
      >
        <JobCard :job="job" />
      </NuxtLink>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center items-center space-x-2 mt-12"
    >
      <button @click="prevPage" :disabled="currentPage === 1">Trước</button>
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="currentPage = page"
        :class="currentPage === page ? 'font-bold' : ''"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Sau</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJobs } from '@/composables/useJobs'

const { fetchJobs } = useJobs()
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

const visiblePages = computed(() => {
  const pages: number[] = []
  for (let i = 1; i <= totalPages.value; i++) pages.push(i)
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
    const res = await fetchJobs()
    console.log('Jobs API response:', res)
    const jobs = Array.isArray(res) ? res : res?.DT || []
    allJobs.value = jobs
    filteredJobs.value = jobs
  } catch (err) {
    console.error('Fetch jobs error:', err)
  }
})

</script>
