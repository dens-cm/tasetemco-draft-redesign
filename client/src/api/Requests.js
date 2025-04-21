/* eslint-disable no-useless-catch */
import axiosInstance from "@/config/AxiosInstance"
import API_ROUTES from "../config/APIRoutes"


export const login = async (email, password, loading, showToast) => {
    try {
        loading(true)
        const request = await axiosInstance.post(API_ROUTES.LOGIN, {
            email,
            password
        }, { withCredentials: true })

        const { accessToken } = request.data
        localStorage.setItem("accessToken", accessToken)
        showToast({ title: 'Success', description: 'Login successfully', status: 'success' })
        window.location.href = '/'
    } catch (error) {
        let errorMessage = "An unexpected error occurred"

        if (error.response) {
            errorMessage = error.response.data.error
        } else if (error.request) {
            errorMessage = "Please try again."
        } else {
            errorMessage = error.message
        }

        showToast({ title: 'Login failed', description: errorMessage, status: 'error' })
    } finally {
        loading(false)
    }
}

export const submitLoan = async (loanData, loading, showToast, setCurrentView) => {
    try {
        loading(true)
        await axiosInstance.post(API_ROUTES.SUBMIT_LOAN, loanData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })

        showToast({ title: 'Success', description: 'Loan submitted successfully', status: 'success' })
        setCurrentView('Dashboard')
    } catch (error) {
        showToast({ title: 'Error', description: `${error.response.data.error || error.response.message}`, status: 'error' })
    } finally {
        loading(false)
    }
}

export const fetchMembers = async () => {
    try {
        const request = await axiosInstance.get(API_ROUTES.MEMBERS, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })

        return request.data
    } catch (error) {
        throw error
    }
}

export const logout = async (user, isAdmin, loading, closeModal, navigate, showToast) => {
    try {
        loading(true)

        const request = await axiosInstance.post(API_ROUTES.LOGOUT, {}, { withCredentials: true })
        localStorage.removeItem("accessToken")

        user(null)
        isAdmin(null)
        showToast({ title: 'Success', description: request.data.message, status: 'info' })
        closeModal()
        navigate('/login')
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.message || 'An error occurred'
        showToast({ title: 'Error', description: errorMessage, status: 'warning' })
    } finally {
        loading(false)
    }
}