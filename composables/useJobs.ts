export const useJobs = () => {
  const { $axios } = useNuxtApp()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchJobs = async (page = 1, limit = 10) => {
    loading.value = true
    error.value = null
    try {
      const res = await $axios.get("/jobs", { params: { page, limit } })
      return res.data
    } catch (err: any) {
      error.value = err.message || 'Có lỗi xảy ra'
      throw err
    } finally {
      loading.value = false
    }
  }

  // trong composables/useJobs.ts
  const fetchJobById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      console.log('Fetching job by ID:', id)
      const res = await $axios.get(`/jobs/${id}`)
      if (!res.data) {
        throw new Error('Job not found')
      }
      return res.data
    } catch (err: any) {
      error.value = err.message || 'Có lỗi xảy ra khi tải chi tiết công việc'
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchJobs = async (filters: { keyword?: string; location?: string; level?: string }) => {
    loading.value = true
    error.value = null
    try {
      console.log('Searching with filters:', filters)
      const res = await $axios.get("/jobs/search", { params: filters })
      console.log('Search response:', res.data)
      return res.data
    } catch (err: any) {
      console.error('Search error:', err)
      error.value = err.message || 'Có lỗi xảy ra khi tìm kiếm'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    fetchJobs,
    fetchJobById,
    searchJobs,
    loading: readonly(loading),
    error: readonly(error)
  }
}

export function mapJobData(raw: any) {
  const processDescription = (desc: string): string => {
    if (!desc) return "";

    // Xử lý description gốc từ job posting của bạn
    let processed = desc
      // Loại bỏ các dòng trống liên tiếp
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      // Giới hạn số từ (tuỳ chọn - có thể điều chỉnh số 50 theo nhu cầu)
      .split(' ').slice(0, 50).join(' ') + '...';

    return processed;
  };
  return {
    id: raw._id || raw.id,
    title: raw.title,
    location: raw.location || "Chưa cập nhật",
    salary: raw.salary || "Thoả thuận",
    type: raw.type || "Full-time",
    level: raw.level || "Không xác định",
    description: processDescription(raw.jobDescription || ""),
    skills: raw.tags || [],
    requirements: raw.requirements || [],
    benefits: raw.benefits || [],
    jobUrl: raw.jobUrl || null,
    postDate: raw.postDate || null,
    company: {
      name: raw.company || "Chưa cập nhật",
      logo: raw.companyLogo || "/placeholder-company.png",
      industry: raw.companyIndustry || "Đang cập nhật",
      description: raw.companyDescription || "Chưa có mô tả"
    }
  }
}