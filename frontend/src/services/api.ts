import axios from 'axios';

const api = axios.create({
    // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (email: string, senha: string) => {
        const response = await api.post('/auth/login', { email, senha });
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        return response.data;
    },
    register: async (data: any) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    },
};

api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        // Don't auto-logout if we are already on the login page or if the error is from the login endpoint
        const isLoginRequest = error.config?.url?.includes('/auth/login');
        if (error.response?.status === 401 && !isLoginRequest) {
            authService.logout();
        }
        return Promise.reject(error);
    }
);

export default api;
