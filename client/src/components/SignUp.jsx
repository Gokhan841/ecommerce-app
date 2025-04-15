import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { FetchRegister } from '../api';
import { useAuth } from '../contexts/Auth';
import { useNavigate } from 'react-router';


const SignUp = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  //#region Validasyon İşlemleri Yapılıyor.
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçerli bir e-posta adresi girin")
      .required("Email zorunludur"),
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter olmalı")
      .required("Şifre zorunludur"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], "Şifreler eşleşmiyor") // Şifrelerin aynı olup olmadığını kontrolünü yaptım!
      .required("Şifre tekrarı zorunludur"),
  });
  //#endregion

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: ""
    },

    onSubmit: async (values, { setErrors, resetForm }) => {

      try {
        const { passwordConfirm, ...filteredValues } = values; // Backend bizden sadece email ve password bekliyo o yüzden passwordConfirmi çıkardık.
        const response = await FetchRegister(filteredValues);
        login(response)
        navigate("/profile")
        resetForm();

      } catch (error) {
        console.error("Kayıt sırasında hata oluştu:", error.response?.data || error.message);
        setErrors({ email: "Bu email adresi zaten kullanılıyor!" });
      }
    },

    validationSchema,
  })


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-light-peach p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-slate-gray text-center mb-6">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-gray mb-2">Email</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              name='email'

              className="w-full p-3 border border-warm-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal" />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-slate-gray mb-2">Password</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              name='password'
              className="w-full p-3 border border-warm-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal" />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label className="block text-slate-gray mb-2">Confirm Password</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirm}
              type="password"
              name='passwordConfirm'
              className="w-full p-3 border border-warm-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal" />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.passwordConfirm}</div>
            ) : null}
          </div>
          <button type='submit' className="w-full bg-soft-teal text-white py-3 rounded-lg hover:bg-pale-green transition"
            disabled={!(formik.isValid && formik.dirty)} // Form geçerli değilse butonu disable yap
          >Sign Up</button>

        </form>
      </div>
    </div>
  )
}

export default SignUp

/*
--Formik ile ilgili notlar!

Formik içindeki useFormik() hook'u, handleChange, handleBlur gibi özel isimlere sahip fonksiyonlar döndürür.Eğer bu isimleri değiştirirsem formikin otomatik yaptığı işer işlemez.
formik.handleChange; // Input değişimlerini yönetir
formik.handleBlur;   // Input dışına çıkıldığında çalışır
formik.handleSubmit; // Form gönderildiğinde çalışır

*/

// formu doldurduk fetchregister ile form bilgilerine apiye attık. api bize bir response döndü. içinde tokenlar ve user bilgileri var.
// Token ve user bilgilerini saklamak üzere bir context oluşturduk. Context içinde login fonksiyonunda user ve token bilgilerini set ettik.

