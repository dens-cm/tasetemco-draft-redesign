import axios from 'axios'
import API_ROUTES from './APIRoutes'
import Toast from '@/components/toast/Toast'

const axiosInstance = axios.create({
    withCredentials: true 
})

const showToast = Toast()

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config

        if (error && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const refreshRes = await axios.post(API_ROUTES.REFRESH, {}, { withCredentials: true })

                const newAccessToken = refreshRes.data.accessToken
                localStorage.setItem("accessToken", newAccessToken)
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                return axiosInstance(originalRequest) 
            } catch (refreshError) {
                showToast({ title: 'Error', description: `${refreshError.message}`, status: 'error' })
                localStorage.removeItem("accessToken")
                return Promise.reject(refreshError)
            } 
        }

        return Promise.reject(error)
    }
)

export default axiosInstance
