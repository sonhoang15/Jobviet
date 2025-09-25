<template>
  <div v-if="job" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="mb-8">
      <ol class="flex items-center space-x-2 text-sm">
        <li><NuxtLink to="/" class="text-primary-600 hover:text-primary-700">Trang chủ</NuxtLink></li>
        <li class="text-gray-400">/</li>
        <li><NuxtLink to="/jobs" class="text-primary-600 hover:text-primary-700">Việc làm</NuxtLink></li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-900 font-medium">{{ job.title }}</li>
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
              class="company-logo"
            />
            <div class="flex-1">
              <div class="flex items-start justify-between mb-2">
                <div>
                  <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ job.title }}</h1>
                  <h2 class="text-lg text-gray-700 font-medium">{{ job.company.name }}</h2>
                </div>
                <div class="flex flex-col space-y-2">
                  <span v-if="job.isHot" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    🔥 Hot Job
                  </span>
                  <span v-if="job.isUrgent" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                    ⚡ Urgent
                  </span>
                </div>
              </div>
              
              <!-- Job Meta -->
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="flex items-center text-gray-600">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ job.location }}
                </div>
                <div class="flex items-center text-success-600 font-medium">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  {{ job.salary }}
                </div>
                <div class="flex items-center text-gray-600">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ job.type.replace('-', ' ') | capitalize }}
                </div>
                <div class="flex items-center text-gray-600">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  {{ job.level | capitalize }}
                </div>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Kỹ năng yêu cầu:</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="skill in job.skills" 
                :key="skill"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Posted Date -->
          <div class="text-sm text-gray-500 border-t pt-4">
            Đăng ngày: {{ formatDate(job.postedAt) }} | Hạn nộp: {{ formatDate(job.deadline) }}
          </div>
        </div>

        <!-- Job Description -->
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Mô tả công việc</h3>
          <div class="prose max-w-none text-gray-700">
            <p>{{ job.description }}</p>
          </div>
        </div>

        <!-- Requirements -->
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Yêu cầu ứng viên</h3>
          <ul class="space-y-2">
            <li 
              v-for="requirement in job.requirements" 
              :key="requirement"
              class="flex items-start"
            >
              <svg class="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-gray-700">{{ requirement }}</span>
            </li>
          </ul>
        </div>

        <!-- Benefits -->
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Quyền lợi</h3>
          <ul class="space-y-2">
            <li 
              v-for="benefit in job.benefits" 
              :key="benefit"
              class="flex items-start"
            >
              <svg class="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-gray-700">{{ benefit }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <!-- Apply Button -->
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6 sticky top-24">
          <button class="w-full btn-primary py-3 text-lg font-semibold mb-4">
            Ứng tuyển ngay
          </button>
          <button class="w-full btn-secondary py-3 mb-4">
            Lưu việc làm
          </button>
          
          <!-- Share -->
          <div class="border-t pt-4">
            <p class="text-sm font-medium text-gray-900 mb-2">Chia sẻ:</p>
            <div class="flex space-x-3">
              <button class="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button class="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
              <button class="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Company Info -->
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Thông tin công ty</h3>
          <div class="flex items-center space-x-3 mb-4">
            <img 
              :src="job.company.logo" 
              :alt="job.company.name"
              class="w-12 h-12 rounded-lg object-cover border border-gray-200"
            />
            <div>
              <h4 class="font-medium text-gray-900">{{ job.company.name }}</h4>
              <p class="text-sm text-gray-600">{{ job.company.industry }}</p>
            </div>
          </div>
          <div class="space-y-2 text-sm text-gray-600 mb-4">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {{ job.company.location }}
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {{ job.company.size }}
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z"></path>
              </svg>
              {{ job.company.jobCount }} vị trí đang tuyển
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-4">{{ job.company.description }}</p>
          <NuxtLink :to="`/companies/${job.company.id}`" class="block w-full text-center btn-secondary py-2">
            Xem trang công ty
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy công việc</h1>
      <p class="text-gray-600 mb-4">Công việc bạn tìm kiếm có thể đã bị xóa hoặc không tồn tại</p>
      <NuxtLink to="/" class="btn-primary">
        Về trang chủ
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getJobById } = useJobs()

const job = getJobById(route.params.id as string)

// SEO
useHead({
  title: job ? `${job.title} - ${job.company.name} | ITJobs` : 'Không tìm thấy công việc | ITJobs',
  meta: [
    { name: 'description', content: job ? job.description : 'Công việc không tìm thấy' }
  ]
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// If job not found, show 404
if (!job) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Không tìm thấy công việc'
  })
}
</script>