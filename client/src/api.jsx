import axios from "axios";

// API base URL - production ve development için
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Axios Request Interceptor // (Tüm isteklerde otomatik token ekleme)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); 
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



// Tüm ürünleri çekiyorum 12 lik limit dahilinde
export const FetchProductList = async ({ pageParam = 1 }) => {
  const response = await api.get(`/product?page=${pageParam}`);
  return response.data;
};

// Üzerine tıkladığım ürünü çekiyorum
export const FetchProduct = async (id) => {
  const data = await api.get(`/product/${id}`);
  return data;
};

// Formik ile form verilerini bir API'ye gönderiyorum (POST işlemi)
export const FetchRegister = async (input) => {
  const data = await api.post(`/auth/register`, input);
  return data;
};

// Formik ile form verilerini bir API'ye gönderiyorum (POST işlemi)
export const FetchLogin = async (input) => {
  const data = await api.post(`/auth/login`, input);
  return data;
};

// Giriş yapıldıktan sonra hep kalacak şekilde tutmazmız lazım kullanıcı bilgilerini
export const FetchMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Logout yaapan kullanıcı bilgilerini backend e post ediyoruz.
export const FetchLogout = async (input) => {
  const data = await api.post(`/auth/logout`, {
    refresh_token: localStorage.getItem("refresh_token")
  });
  return data;
};




/*
Eğer sadece kullanıcı giriş bilgilerini (örneğin, e-posta ve şifre) saklamak istiyorsan localStorage yeterli olabilir ama 
güvenli bir kimlik doğrulama mekanizması için cookie-based authentication önerilir. 🚀
*/