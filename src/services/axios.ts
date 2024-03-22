import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios, { AxiosError } from 'axios'
import { useTokenStore } from "@/hook/useTokenStore"
import { message as Message } from '@/components/AntdStatic'
import { useNavigate } from "react-router-dom"

interface HttpResponse {
    data: never
    code: number
    message?: string
}

// 创建axios实例对象
const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10 * 1000
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useTokenStore.getState().token
    token && (config.headers.Authorization = ("Bearer " + token))
    return config
}, (error: AxiosError) => {
    return Promise.reject(error)
})


api.interceptors.response.use((response: AxiosResponse) => {
    const { code, data } = response.data
    if (code === 1) {
        return data
    }else if(code === 401) {
        const naigate = useNavigate()
        setTimeout(() => {
            naigate('/login')
        }, 300)
    }
}, (error: AxiosError<HttpResponse>) => {
    Message.error(error.message)
    return Promise.reject(error)
})


const http = {
    get<T = HttpResponse>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return api.get(url, config)
    },
    post<T = HttpResponse>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return api.post(url, data, config)
    },
    put<T = never>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return api.put(url, data, config)
    },
    delete<T = never>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return api.delete(url, config)
    }
}
export default http
