<template>
  <div>
    <!-- Hero Section -->
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
          <span>{{ totalJobs }}+ việc làm</span>
          <span>{{ totalCompanies }}+ công ty</span>
          <span>Cập nhật hàng ngày</span>
        </div>
      </div>
    </section>

    <!-- Hot Jobs Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">
            🔥 Việc làm hot nhất
          </h2>
          <NuxtLink to="/jobs" class="text-primary-600 hover:text-primary-700 font-medium">
            Xem tất cả →
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <JobCard 
            v-for="job in hotJobs" 
            :key="job.id" 
            :job="job" 
          />
        </div>
      </div>
    </section>

    <!-- All Jobs Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">
            Tất cả việc làm
          </h2>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">{{ filteredJobs.length }} việc làm</span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <JobCard 
            v-for="job in paginatedJobs" 
            :key="job.id" 
            :job="job" 
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-12">
          <button 
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          
          <div class="flex space-x-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg',
                currentPage === page 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      </div>
    </section>

    <!-- Top Companies -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">
            Công ty hàng đầu
          </h2>
          <NuxtLink to="/companies" class="text-primary-600 hover:text-primary-700 font-medium">
            Xem tất cả →
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <CompanyCard 
            v-for="company in allCompanies" 
            :key="company.id" 
            :company="company" 
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { searchJobs, getHotJobs, allJobs, allCompanies } = useJobs()

// SEO
useHead({
  title: 'ITJobs - Tìm việc làm IT hàng đầu Việt Nam',
  meta: [
    { name: 'description', content: 'Tìm kiếm việc làm IT với mức lương hấp dẫn từ các công ty công nghệ hàng đầu. Frontend, Backend, DevOps, Mobile, Data Engineer và nhiều vị trí khác.' }
  ]
})

// Data
const hotJobs = getHotJobs()
const currentPage = ref(1)
const pageSize = 10
const searchFilters = ref({
  keyword: '',
  location: '',
  level: '',
  type: ''
})

// Computed
const totalJobs = computed(() => allJobs.value.length)
const totalCompanies = computed(() => allCompanies.value.length)

const filteredJobs = computed(() => {
  return searchJobs(searchFilters.value)
})

const totalPages = computed(() => Math.ceil(filteredJobs.value.length / pageSize))

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredJobs.value.slice(start, start + pageSize)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const halfVisible = Math.floor(maxVisible / 2)
  
  let startPage = Math.max(1, currentPage.value - halfVisible)
  let endPage = Math.min(totalPages.value, startPage + maxVisible - 1)
  
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const handleSearch = (filters: any) => {
  searchFilters.value = { ...filters }
  currentPage.value = 1
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>