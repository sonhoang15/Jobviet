// setup/axios.ts
import axios from "axios"

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const api = axios.create({
        baseURL: config.public.apiBase || "http://localhost:8000",
        headers: {
            "Content-Type": "application/json",
        },
    })

    api.interceptors.request.use(
        (request) => {
            if (process.client) {  // tránh lỗi SSR khi gọi localStorage
                const token = localStorage.getItem("token")
                if (token) {
                    request.headers.Authorization = `Bearer ${token}`
                }
            }
            return request
        },
        (error) => Promise.reject(error)
    )

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error("API error:", error.response?.data || error.message)
            return Promise.reject(error)
        }
    )

    return {
        provide: {
            axios: api,
        },
    }
})
