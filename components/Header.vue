<template>
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">IT</span>
          </div>
          <span class="text-xl font-bold text-gray-900">Jobs</span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Việc làm
          </NuxtLink>
          <NuxtLink to="/companies" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Công ty
          </NuxtLink>
          <NuxtLink to="/blog" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Blog
          </NuxtLink>
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <button class="btn-secondary text-sm">
            Đăng nhập
          </button>
          <button class="btn-primary text-sm">
            Đăng ký
          </button>
          <button class="md:hidden p-2 text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>