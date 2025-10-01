<template>
  <div>
    <!-- Search Form -->
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Keyword Search -->
        <div class="flex-1">
          <input
            v-model="searchForm.keyword"
            type="text"
            placeholder="Tìm kiếm công việc, kỹ năng..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            @keyup.enter="handleSearch"
          />
        </div>

        <!-- Location -->
        <div class="flex-1 md:max-w-xs">
          <select 
            v-model="searchForm.location"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Tất cả địa điểm</option>
            <option value="hồ chí minh">Hồ Chí Minh</option>
            <option value="hà nội">Hà Nội</option>
            <option value="đà nẵng">Đà Nẵng</option>
            <option value="cần thơ">Cần Thơ</option>
          </select>
        </div>

        <!-- Level -->
        <div class="flex-1 md:max-w-xs">
          <select 
            v-model="searchForm.level"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Tất cả cấp bậc</option>
            <option value="junior">Junior</option>
            <option value="middle">Middle</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>

        <!-- Search Button -->
        <button 
          @click="handleSearch"
          :disabled="loading"
          class="btn-primary px-8 py-3 whitespace-nowrap disabled:opacity-50"
        >
          <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          {{ loading ? 'Đang tìm...' : 'Tìm kiếm' }}
        </button>
      </div>
    </div>

    <!-- Hiển thị kết quả -->
    <div class="mt-6">
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p class="mt-2 text-gray-600">Đang tìm kiếm công việc...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-700">{{ error }}</p>
      </div>

      <!-- Results -->
      <div v-else>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">
            Kết quả tìm kiếm ({{ jobs.length }} công việc)
          </h2>
        </div>

        <!-- Danh sách công việc -->
        <div v-if="jobs.length > 0" class="space-y-4">
          <div 
            v-for="job in jobs" 
            :key="job.id"
            class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h3 class="text-lg font-semibold text-primary-600 mb-2">{{ job.title }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {{ job.location }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
                {{ job.salary }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                {{ job.level }}
              </div>
            </div>
            <p class="text-gray-700 line-clamp-2">{{ job.description }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span 
                v-for="skill in job.skills.slice(0, 4)" 
                :key="skill"
                class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {{ skill }}
              </span>
              <span v-if="job.skills.length > 4" class="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                +{{ job.skills.length - 4 }} more
              </span>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="hasSearched" class="text-center py-12 bg-gray-50 rounded-lg">
          <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">Không tìm thấy công việc phù hợp</h3>
          <p class="mt-2 text-gray-500">Hãy thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc của bạn.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useJobs, mapJobData } from '@/composables/useJobs'

interface SearchForm {
  keyword: string
  location: string
  level: string
}

const searchForm = ref<SearchForm>({
  keyword: '',
  location: '',
  level: ''
})

const { searchJobs, loading, error } = useJobs()
const jobs = ref<any[]>([])
const hasSearched = ref(false)

// Hàm gọi API search
const fetchJobs = async (filters: SearchForm) => {
  console.log('Fetching jobs with filters:', filters)
  
  try {
    const data = await searchJobs({
      keyword: filters.keyword || undefined,
      location: filters.location || undefined,
      level: filters.level || undefined
    })

    console.log('Received data:', data)
    jobs.value = data.map((job: any) => mapJobData(job))
    hasSearched.value = true
  } catch (err) {
    console.error('Error in fetchJobs:', err)
    jobs.value = []
    hasSearched.value = true
  }
}

// Khi click nút Tìm kiếm
const handleSearch = () => {
  fetchJobs({ ...searchForm.value })
}

// Auto search với debounce
let searchTimeout: NodeJS.Timeout
watch(searchForm, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (searchForm.value.keyword || searchForm.value.location || searchForm.value.level) {
      fetchJobs({ ...searchForm.value })
    }
  }, 500)
}, { deep: true })
</script>