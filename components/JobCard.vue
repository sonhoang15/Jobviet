<template>
  <div class="job-card group cursor-pointer" @click="navigateToJob">
    <div class="flex items-start space-x-4">

      <img 
        :src="job.companyLogo || 'https://via.placeholder.com/64'" 
        :alt="job.company"
        class="company-logo w-16 h-16 object-cover rounded"
      />

      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between mb-2">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {{ job.title }}
            </h3>
            <p class="text-gray-600 font-medium">{{ job.company }}</p>
          </div>
        </div>

        <div class="flex items-center space-x-4 mb-3 text-sm text-gray-600">
          <span>{{ job.location }}</span>
          <span class="font-medium text-success-600">
            {{ job.salary || 'Thoả thuận' }}
          </span>
        </div>


        <div class="flex flex-wrap gap-2 mb-3">
          <span 
            v-for="tag in job.tags.slice(0, 4)" 
            :key="tag"
            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary-100 text-primary-800"
          >
            {{ tag }}
          </span>
          <span 
            v-if="job.tags.length > 4"
            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
          >
            +{{ job.tags.length - 4 }}
          </span>
        </div>


        <div class="flex items-center justify-between text-sm text-gray-500">
          <span>{{ formatDate(job.postDate) }}</span>
          <div class="flex items-center space-x-2">
            <span v-if="job.level" class="capitalize px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {{ job.level }}
            </span>
            <span v-if="job.employmentType" class="capitalize px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {{ job.employmentType }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '~/types/index'

const props = defineProps<{ job: Job }>()

// THÊM FUNCTION MỚI - điều hướng đến trang chi tiết job
const navigateToJob = () => {
  navigateTo(`/jobs/${props.job._id}`)
}

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Hôm qua'
  if (diffDays < 7) return `${diffDays} ngày trước`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} tuần trước`
  return `${Math.ceil(diffDays / 30)} tháng trước`
}
</script>