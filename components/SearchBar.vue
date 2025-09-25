<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Keyword Search -->
      <div class="flex-1">
        <input
          v-model="searchForm.keyword"
          type="text"
          placeholder="Tìm kiếm công việc, kỹ năng..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
        class="btn-primary px-8 py-3 whitespace-nowrap"
      >
        <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        Tìm kiếm
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SearchForm {
  keyword: string;
  location: string;
  level: string;
}

const emit = defineEmits<{
  search: [filters: SearchForm]
}>()

const searchForm = ref<SearchForm>({
  keyword: '',
  location: '',
  level: ''
})

const handleSearch = () => {
  emit('search', { ...searchForm.value })
}

// Auto search on input change with debounce
watch(searchForm, () => {
  handleSearch()
}, { deep: true })
</script>