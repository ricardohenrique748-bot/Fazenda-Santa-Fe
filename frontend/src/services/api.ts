import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
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
        const isLoginRequest = error.config?.url?.includes('/auth/login');
        const errorMessage = error.response?.data?.message || '';

        if (error.response?.status === 401 && !isLoginRequest) {
            // Se for erro de empresa não identificada, não desloga (pode ser o mestre carregando dados)
            const isMissingCompany = errorMessage.includes('Empresa') || errorMessage.includes('empresa');

            if (!isMissingCompany) {
                authService.logout();
            }
        }
        return Promise.reject(error);
    }
);

export default api;
