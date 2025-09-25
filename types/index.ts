export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  level: 'junior' | 'middle' | 'senior' | 'lead';
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: string;
  deadline: string;
  isHot: boolean;
  isUrgent: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  size: string;
  industry: string;
  location: string;
  website: string;
  description: string;
  benefits: string[];
  jobCount: number;
}

export interface SearchFilters {
  keyword: string;
  location: string;
  skills: string[];
  level: string;
  type: string;
  salary: string;
}