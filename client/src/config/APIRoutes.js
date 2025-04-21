const isProd = import.meta.env.VITE_PRODUCTION === 'false'
const URL = isProd ? import.meta.env.VITE_DEV_URL : import.meta.env.VITE_PROD_URL

const API_ROUTES = {
    LOGIN: `${URL}/auth/login`,
    TASETEMCO: `${URL}/tasetemco`,
    MEMBERS: `${URL}/members`,
    SUBMIT_LOAN: `${URL}/submit-loan`,
    LOANS: `${URL}/loans`, 
    REFRESH: `${URL}/auth/refresh`,
    LOGOUT: `${URL}/auth/logout`,
}

export default API_ROUTES