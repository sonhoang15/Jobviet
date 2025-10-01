// ~/types/index.ts
export interface Job {
  _id: string
  title: string
  company: string
  location?: string
  salary?: string
  tags: string[]
  postDate?: string
  level?: string
  employmentType?: string
  description?: string
  companyLogo?: string
  url?: string
  createdAt?: string
  updatedAt?: string
}
export interface Company {
  _id: string
  name: string
  logo: string
  size: string
  industry: string
  location: string
  website: string
  description: string
  benefits: readonly string[]
  jobCount: number
}

export interface SearchFilters {
  keyword: string
  location: string
  skills: string[]
  level: string
  type: string
  salary: string
}

// Danh sách jobs (findAll)
export interface JobListResponse {
  statusCode: number;
  result: {
    data: Job[];
    meta: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
}

// Chi tiết job (findById)
export interface JobDetailResponse {
  statusCode: number;
  data: Job;
}

// Search jobs
export interface SearchResponse {
  statusCode: number;
  data: Job[];
}