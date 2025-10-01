export const useCompanies = () => {
    const { $axios } = useNuxtApp()

    const fetchCompanies = async () => {
        const res = await $axios.get('/companies')
        return res.data
    }

    const fetchCompanyById = async (id: string) => {
        const res = await $axios.get(`/companies/${id}`)
        return res.data
    }

    return { fetchCompanies, fetchCompanyById }
}
