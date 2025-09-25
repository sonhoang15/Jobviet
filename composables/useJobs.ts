import type { Job, Company } from '~/types'

const companies: Company[] = [
  {
    id: '1',
    name: 'VNG Corporation',
    logo: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    size: '1000+ người',
    industry: 'Technology',
    location: 'Hồ Chí Minh',
    website: 'https://vng.com.vn',
    description: 'VNG là công ty công nghệ hàng đầu tại Việt Nam',
    benefits: ['Bảo hiểm sức khỏe', 'Du lịch hàng năm', 'Thưởng hiệu suất'],
    jobCount: 25
  },
  {
    id: '2',
    name: 'FPT Software',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    size: '500-1000 người',
    industry: 'Software Development',
    location: 'Hà Nội',
    website: 'https://fpt-software.com',
    description: 'Công ty phần mềm hàng đầu Việt Nam',
    benefits: ['Lương tháng 13', 'Đào tạo nước ngoài', 'Bảo hiểm cao cấp'],
    jobCount: 45
  },
  {
    id: '3',
    name: 'Tiki',
    logo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    size: '200-500 người',
    industry: 'E-commerce',
    location: 'Hồ Chí Minh',
    website: 'https://tiki.vn',
    description: 'Nền tảng thương mại điện tử hàng đầu',
    benefits: ['Flexible working hours', 'Meal allowance', 'Health insurance'],
    jobCount: 18
  },
  {
    id: '4',
    name: 'Grab Vietnam',
    logo: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    size: '100-200 người',
    industry: 'Technology',
    location: 'Hồ Chí Minh',
    website: 'https://grab.com',
    description: 'Super app hàng đầu Đông Nam Á',
    benefits: ['Stock options', 'International environment', 'Career development'],
    jobCount: 12
  }
]

const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer (React/Vue)',
    company: companies[0],
    location: 'Hồ Chí Minh',
    salary: '$1,500 - $3,000',
    type: 'full-time',
    level: 'senior',
    skills: ['React', 'Vue.js', 'TypeScript', 'Node.js'],
    description: 'Tìm kiếm Senior Frontend Developer có kinh nghiệm phát triển ứng dụng web hiện đại',
    requirements: [
      '3+ năm kinh nghiệm Frontend Development',
      'Thành thạo React/Vue.js và TypeScript',
      'Kinh nghiệm với RESTful APIs',
      'Có kinh nghiệm làm việc nhóm và Agile'
    ],
    benefits: [
      'Lương cạnh tranh + thưởng hiệu suất',
      'Bảo hiểm sức khỏe cao cấp',
      'Cơ hội đào tạo nước ngoài',
      'Môi trường làm việc năng động'
    ],
    postedAt: '2024-01-15',
    deadline: '2024-02-15',
    isHot: true,
    isUrgent: false
  },
  {
    id: '2',
    title: 'Full Stack Developer (Node.js + React)',
    company: companies[1],
    location: 'Hà Nội',
    salary: '$1,200 - $2,500',
    type: 'full-time',
    level: 'middle',
    skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
    description: 'Cần tuyển Full Stack Developer để phát triển các sản phẩm công nghệ mới',
    requirements: [
      '2+ năm kinh nghiệm Full Stack',
      'Thành thạo Node.js và React',
      'Kinh nghiệm với Database (MongoDB/PostgreSQL)',
      'Hiểu biết về Cloud Services (AWS/GCP)'
    ],
    benefits: [
      'Lương tháng 13, 14',
      'Review lương 2 lần/năm',
      'Team building quarterly',
      'Flexible working time'
    ],
    postedAt: '2024-01-14',
    deadline: '2024-02-20',
    isHot: false,
    isUrgent: true
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: companies[2],
    location: 'Hồ Chí Minh',
    salary: '$1,800 - $3,500',
    type: 'full-time',
    level: 'senior',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    description: 'Tham gia xây dựng và vận hành hệ thống infrastructure cho các sản phẩm e-commerce',
    requirements: [
      '3+ năm kinh nghiệm DevOps',
      'Thành thạo Docker, Kubernetes',
      'Kinh nghiệm với CI/CD pipelines',
      'Kinh nghiệm vận hành production system'
    ],
    benefits: [
      'Lương negotiable theo năng lực',
      'Bonus theo hiệu suất công ty',
      'Insurance for family',
      'Remote working support'
    ],
    postedAt: '2024-01-12',
    deadline: '2024-02-10',
    isHot: true,
    isUrgent: true
  },
  {
    id: '4',
    title: 'Mobile Developer (React Native)',
    company: companies[3],
    location: 'Hồ Chí Minh',
    salary: '$1,000 - $2,000',
    type: 'full-time',
    level: 'middle',
    skills: ['React Native', 'iOS', 'Android', 'JavaScript'],
    description: 'Phát triển ứng dụng mobile cho hàng triệu người dùng tại Đông Nam Á',
    requirements: [
      '2+ năm kinh nghiệm React Native',
      'Đã publish app lên App Store/Play Store',
      'Hiểu biết về native development',
      'Kinh nghiệm với performance optimization'
    ],
    benefits: [
      'Stock options program',
      'International working environment',
      'Career development program',
      'Health & wellness benefits'
    ],
    postedAt: '2024-01-10',
    deadline: '2024-02-05',
    isHot: false,
    isUrgent: false
  },
  {
    id: '5',
    title: 'Junior Java Developer',
    company: companies[1],
    location: 'Đà Nẵng',
    salary: '$500 - $1,000',
    type: 'full-time',
    level: 'junior',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Git'],
    description: 'Vị trí Junior Java Developer cho fresher và developer có ít kinh nghiệm',
    requirements: [
      'Tốt nghiệp ngành CNTT hoặc tương đương',
      'Có kiến thức cơ bản về Java',
      'Hiểu biết về OOP và Database',
      'Có khả năng học hỏi và làm việc nhóm'
    ],
    benefits: [
      'Đào tạo từ A-Z',
      'Mentor 1-1 support',
      'Clear career path',
      'Young and dynamic team'
    ],
    postedAt: '2024-01-08',
    deadline: '2024-01-30',
    isHot: false,
    isUrgent: false
  },
  {
    id: '6',
    title: 'Data Engineer',
    company: companies[0],
    location: 'Hồ Chí Minh',
    salary: '$1,500 - $2,800',
    type: 'full-time',
    level: 'middle',
    skills: ['Python', 'Spark', 'Hadoop', 'SQL'],
    description: 'Xây dựng và vận hành data pipeline cho các sản phẩm big data',
    requirements: [
      '2+ năm kinh nghiệm Data Engineering',
      'Thành thạo Python và SQL',
      'Kinh nghiệm với Big Data tools',
      'Hiểu biết về Data Warehouse'
    ],
    benefits: [
      'Competitive salary',
      'Learning budget',
      'Flexible schedule',
      'Modern equipment'
    ],
    postedAt: '2024-01-05',
    deadline: '2024-02-28',
    isHot: false,
    isUrgent: false
  }
]

export const useJobs = () => {
  const allJobs = ref(jobs)
  const allCompanies = ref(companies)

  const searchJobs = (filters: any) => {
    return jobs.filter(job => {
      const matchesKeyword = !filters.keyword || 
        job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(filters.keyword.toLowerCase()))
      
      const matchesLocation = !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      
      const matchesLevel = !filters.level || job.level === filters.level
      
      const matchesType = !filters.type || job.type === filters.type

      return matchesKeyword && matchesLocation && matchesLevel && matchesType
    })
  }

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id)
  }

  const getCompanyById = (id: string) => {
    return companies.find(company => company.id === id)
  }

  const getHotJobs = () => {
    return jobs.filter(job => job.isHot).slice(0, 6)
  }

  return {
    allJobs: readonly(allJobs),
    allCompanies: readonly(allCompanies),
    searchJobs,
    getJobById,
    getCompanyById,
    getHotJobs
  }
}