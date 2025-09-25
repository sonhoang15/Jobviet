<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        Danh sách công ty
      </h1>
      <p class="text-lg text-gray-600">
        Khám phá các công ty công nghệ hàng đầu đang tuyển dụng
      </p>
    </div>

    <!-- Stats -->
    <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div>
          <div class="text-2xl font-bold text-primary-600">{{ allCompanies.length }}+</div>
          <div class="text-sm text-gray-600">Công ty</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-success-600">{{ totalJobs }}+</div>
          <div class="text-sm text-gray-600">Vị trí tuyển dụng</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-orange-600">15+</div>
          <div class="text-sm text-gray-600">Ngành nghề</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-purple-600">3</div>
          <div class="text-sm text-gray-600">Thành phố</div>
        </div>
      </div>
    </div>

    <!-- Companies Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CompanyCard 
        v-for="company in allCompanies" 
        :key="company.id" 
        :company="company" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { allCompanies, allJobs } = useJobs()

// SEO
useHead({
  title: 'Danh sách công ty IT | ITJobs',
  meta: [
    { name: 'description', content: 'Danh sách các công ty công nghệ hàng đầu tại Việt Nam đang tuyển dụng' }
  ]
})

const totalJobs = computed(() => {
  return allCompanies.value.reduce((total, company) => total + company.jobCount, 0)
})
</script>