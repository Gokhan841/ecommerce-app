import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { FetchLogin } from '../api';
import { useAuth } from '../contexts/Auth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  //#region Validasyon İşlemleri
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçerli bir e-posta adresi girin")
      .required("Email zorunludur"),
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter olmalı")
      .required("Şifre zorunludur"),
  });
  //#endregion

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const response = await FetchLogin(values);
        login(response);
        navigate("/profile"); // Başarıyla giriş yapınca yönlendir
        resetForm();
      } catch (error) {
        console.error("Giriş sırasında hata oluştu:", error.response?.data || error.message);
        setErrors({ general: error.response?.data?.message || "Giriş başarısız oldu, bilgilerinizi kontrol edin!" });
      }
    },

    validationSchema,
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-light-peach p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-slate-gray text-center mb-6">Sign In</h2>

        {/* Genel hata mesajı gösterme */}
        {formik.errors.general && (
          <div className="text-red-500 text-sm mb-4">{formik.errors.general}</div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-gray mb-2">Email</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              name="email"
              className="w-full p-3 border border-warm-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-slate-gray mb-2">Password</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              name="password"
              className="w-full p-3 border border-warm-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-soft-teal text-white py-3 rounded-lg hover:bg-pale-green transition"
            disabled={!formik.isValid || formik.isSubmitting} // Form gönderiliyorsa buton disable olur
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
