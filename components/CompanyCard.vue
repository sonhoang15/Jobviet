<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 p-6 cursor-pointer group">
    <div class="flex items-start space-x-4">
      <!-- Company Logo -->
      <img 
        :src="company.logo" 
        :alt="company.name"
        class="company-logo"
      />

      <!-- Company Info -->
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
          {{ company.name }}
        </h3>
        <p class="text-gray-600 text-sm mb-2">{{ company.industry }}</p>
        
        <!-- Location & Size -->
        <div class="flex items-center space-x-4 mb-3 text-sm text-gray-500">
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {{ company.location }}
          </span>
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            {{ company.size }}
          </span>
        </div>

        <!-- Description -->
        <p class="text-gray-600 text-sm line-clamp-2 mb-3">
          {{ company.description }}
        </p>

        <!-- Job Count -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-primary-600">
            {{ company.jobCount }} vị trí đang tuyển
          </span>
          <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Xem chi tiết →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Company } from '~/types'

interface Props {
  company: Company
}

defineProps<Props>()
</script>