<template>
  <div class="job-card group cursor-pointer" @click="navigateToJob">
    <div class="flex items-start space-x-4">
      <!-- Company Logo -->
      <img 
        :src="job.company.logo" 
        :alt="job.company.name"
        class="company-logo"
      />

      <!-- Job Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between mb-2">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {{ job.title }}
            </h3>
            <p class="text-gray-600 font-medium">{{ job.company.name }}</p>
          </div>
          
          <!-- Badges -->
          <div class="flex flex-col items-end space-y-1 ml-4">
            <span v-if="job.isHot" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              🔥 Hot
            </span>
            <span v-if="job.isUrgent" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              ⚡ Urgent
            </span>
          </div>
        </div>

        <!-- Location & Salary -->
        <div class="flex items-center space-x-4 mb-3 text-sm text-gray-600">
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {{ job.location }}
          </span>
          <span class="flex items-center font-medium text-success-600">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
            {{ job.salary }}
          </span>
        </div>

        <!-- Skills -->
        <div class="flex flex-wrap gap-2 mb-3">
          <span 
            v-for="skill in job.skills.slice(0, 4)" 
            :key="skill"
            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary-100 text-primary-800"
          >
            {{ skill }}
          </span>
          <span 
            v-if="job.skills.length > 4"
            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
          >
            +{{ job.skills.length - 4 }}
          </span>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between text-sm text-gray-500">
          <span>{{ formatDate(job.postedAt) }}</span>
          <div class="flex items-center space-x-2">
            <span class="capitalize px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {{ job.level }}
            </span>
            <span class="capitalize px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {{ job.type.replace('-', ' ') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '~/types'

interface Props {
  job: Job
}

defineProps<Props>()

const navigateToJob = () => {
  navigateTo(`/jobs/${job.id}`)
}

const formatDate = (dateString: string) => {
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