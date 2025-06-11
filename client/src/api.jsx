import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Vite da kullanılan yöntem bu. başka bişey kullanıcaksan baseurl kısmına bakarsın.
});


// Axios Request Interceptor // (Tüm isteklerde otomatik token ekleme)
axios.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem("access_token"); 
    const { origin } = new URL(config.url); // İstek URL'sinin origin'ini aldık (http://localhost:3000/api/products => http://localhost:3000 gibi )
    const allowedOrigins = [import.meta.env.VITE_BASE_URL];
 


    if (allowedOrigins.includes(origin) && token) {
      config.headers.Authorization = `Bearer ${token}`;
   
    } else {
    
    }

    return config;
  },
  (error) => Promise.reject(error) // Hata durumunda bir Promise döndürüyoruz
);



// // Tüm ürünleri çekiyorum 12 lik limit dahilinde
export const FetchProductList = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `http://localhost:4000/product?page=${pageParam}`
  );
  return response.data; // ✅ Doğru şekilde `response.data` döndürülüyor
};



// Üzerine tıkladığım ürünü çekiyorum
export const FetchProduct = async (id) => {
  const data = await axios.get(`http://localhost:4000/product/${id}`);
  return data;
};


// Formik ile form verilerini bir API'ye gönderiyorum (POST işlemi)
export const FetchRegister = async (input) => {
  const data = await axios.post(`http://localhost:4000/auth/register`, input);
  return data;
};

// Formik ile form verilerini bir API'ye gönderiyorum (POST işlemi)
export const FetchLogin= async (input) => {
  const data = await axios.post(`http://localhost:4000/auth/login`, input);
  return data;
};

//Giriş yapıldıktan sonra hep kalacak şekilde tutmazmız lazım kullanıcı bilgilerini
export const FetchMe = async () => {
  const response = await axios.get('http://localhost:4000/auth/me')
  return response.data;
};

// Logout yaapan kullanıcı bilgilerini backend e post ediyoruz.
export const FetchLogout = async (input) => {
  const data = await axios.post(`http://localhost:4000/auth/logout`, {
    refresh_token:localStorage.getItem("refresh_token")
  });
  return data;
};




/*
Eğer sadece kullanıcı giriş bilgilerini (örneğin, e-posta ve şifre) saklamak istiyorsan localStorage yeterli olabilir ama 
güvenli bir kimlik doğrulama mekanizması için cookie-based authentication önerilir. 🚀
*/