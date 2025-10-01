<template>
  <div v-if="job" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="mb-8">
      <ol class="flex items-center space-x-2 text-sm">
        <li><NuxtLink to="/" class="text-primary-600 hover:text-primary-700">Trang chủ</NuxtLink></li>
        <li class="text-gray-400">/</li>
        <li><NuxtLink to="/jobs" class="text-primary-600 hover:text-primary-700">Việc làm</NuxtLink></li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-900 font-medium truncate max-w-xs">{{ job.title }}</li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <!-- Job Header -->
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <div class="flex items-start space-x-4 mb-4">
            <img 
              :src="job.company.logo" 
              :alt="job.company.name"
              class="w-16 h-16 rounded-lg border object-cover"
              @error="handleImageError"
            />
            <div class="flex-1">
              <div class="flex items-start justify-between mb-2">
                <div>
                  <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ job.title }}</h1>
                  <h2 class="text-lg text-gray-700 font-medium">{{ job.company.name }}</h2>
                </div>
              </div>
              <!-- Meta -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div class="flex items-center text-gray-600">
                  <span class="mr-2">📍</span>
                  {{ job.location }}
                </div>
                <div class="flex items-center text-success-600 font-medium">
                  <span class="mr-2">💰</span>
                  {{ job.salary }}
                </div>
                <div class="flex items-center text-gray-600">
                  <span class="mr-2">⏱</span>
                  {{ capitalize(job.type) }}
                </div>
                <div class="flex items-center text-gray-600">
                  <span class="mr-2">🎯</span>
                  {{ capitalize(job.level) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div class="mb-6" v-if="job.skills && job.skills.length > 0">
          <h3 class="text-sm font-medium text-gray-900 mb-2">Kỹ năng yêu cầu:</h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="skill in job.skills.slice(0, 10)" 
              :key="skill"
              class="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Description -->
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Mô tả công việc</h3>
          <p class="text-gray-700 whitespace-pre-line">{{ job.description || 'Chưa có mô tả chi tiết' }}</p>
        </div>

        <!-- Requirements -->
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6" v-if="job.requirements && job.requirements.length > 0">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Yêu cầu ứng viên</h3>
          <ul class="list-disc pl-5 space-y-2 text-gray-700">
            <li v-for="(req, index) in job.requirements.slice(0, 15)" :key="index">{{ req }}</li>
          </ul>
        </div>

        <!-- Benefits -->
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6" v-if="job.benefits && job.benefits.length > 0">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Quyền lợi</h3>
          <ul class="list-disc pl-5 space-y-2 text-gray-700">
            <li v-for="(benefit, index) in job.benefits.slice(0, 15)" :key="index">{{ benefit }}</li>
          </ul>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-24">
          <button 
            v-if="job.jobUrl"
            @click="applyJob"
            class="w-full btn-primary py-3 text-lg font-semibold mb-4"
          >
            Ứng tuyển ngay
          </button>
          <button 
            v-else
            class="w-full btn-primary py-3 text-lg font-semibold mb-4 opacity-50 cursor-not-allowed"
            disabled
          >
            Liên kết ứng tuyển không khả dụng
          </button>
          
          <button class="w-full btn-secondary py-3 flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
            </svg>
            Lưu việc làm
          </button>
        </div>

        <!-- Company Info -->
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Thông tin công ty</h3>
          <div class="flex items-center space-x-3 mb-4">
            <img 
              :src="job.company.logo" 
              :alt="job.company.name"
              class="w-12 h-12 rounded-lg object-cover border border-gray-200"
              @error="handleImageError"
            />
            <div>
              <h4 class="font-medium text-gray-900">{{ job.company.name }}</h4>
              <p class="text-sm text-gray-600">{{ job.company.industry }}</p>
            </div>
          </div>
          <p class="text-sm text-gray-600">{{ job.company.description }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else-if="pending" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
      <p class="text-gray-600">Đang tải thông tin công việc...</p>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy công việc</h1>
      <p class="text-gray-600 mb-4">Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
      <NuxtLink to="/jobs" class="btn-primary">Quay lại danh sách</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fetchJobById } = useJobs()

// Sử dụng useAsyncData để có SSR và better UX
const { data: job, pending, error } = await useAsyncData(`job-${route.params.id}`, async () => {
  try {
    const jobData = await fetchJobById(route.params.id as string)
    return mapJobData(jobData)
  } catch (err) {
    console.error('Error fetching job:', err)
    return null
  }
})

// SEO
useSeoMeta({
  title: job.value ? `${job.value.title} - ${job.value.company.name}` : 'Chi tiết công việc',
  description: job.value?.description?.substring(0, 160) || 'Chi tiết công việc IT',
  ogTitle: job.value ? `${job.value.title} - ${job.value.company.name}` : 'Chi tiết công việc',
  ogDescription: job.value?.description?.substring(0, 160) || 'Chi tiết công việc IT',
  ogImage: job.value?.company.logo,
})

// Apply job function
const applyJob = () => {
  if (job.value?.jobUrl) {
    window.open(job.value.jobUrl, '_blank', 'noopener,noreferrer')
  }
}

// Handle image error
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/placeholder-company.png'
}

// Capitalize helper function
const capitalize = (value: string): string => {
  if (!value) return "Không xác định"
  return value.charAt(0).toUpperCase() + value.slice(1)
}
</script>