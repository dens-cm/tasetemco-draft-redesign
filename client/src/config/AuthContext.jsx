/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import axiosInstance from './AxiosInstance'
import API_ROUTES from './APIRoutes'
import Toast from '../components/toast/Toast'

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = React.useState(null)
    const [isAdmin, setIsAdmin] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const showToast = Toast()

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                let response = await axiosInstance.get(API_ROUTES.TASETEMCO, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                })
                
                setUser(response.data.user)
                setIsAdmin(response.data.user.isAdmin)
            } catch (error) {
                showToast({ title: 'Error', description: `${error.message}`, status: 'error' })
                setUser(null)
                localStorage.removeItem("accessToken")
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])  

    return (
        <AuthContext.Provider value={{ user, setUser, isAdmin, setIsAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(AuthContext)
