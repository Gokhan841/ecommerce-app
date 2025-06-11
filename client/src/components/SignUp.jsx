import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from 'framer-motion';
import { FetchRegister } from '../api';
import { useAuth } from '../contexts/Auth';
import { useNavigate } from 'react-router';

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn }) => {
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
      .oneOf([Yup.ref('password')], "Şifreler eşleşmiyor")
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
        const { passwordConfirm, ...filteredValues } = values;
        const response = await FetchRegister(filteredValues);
        login(response);
        onClose(); // Modal'ı kapat
        navigate("/profile");
        resetForm();
      } catch (error) {
        console.error("Kayıt sırasında hata oluştu:", error.response?.data || error.message);
        setErrors({ email: "Bu email adresi zaten kullanılıyor!" });
      }
    },

    validationSchema,
  });

  const handleGoogleSignUp = () => {
    // Google OAuth implementasyonu
    console.log("Google ile kayıt olunuyor...");
  };

  const handleFacebookSignUp = () => {
    // Facebook OAuth implementasyonu  
    console.log("Facebook ile kayıt olunuyor...");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 z-10"
              >
                ✕
              </motion.button>

              {/* Header with Animation */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-green-500 to-blue-500 p-8 text-center"
              >
                <motion.h2
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  Join Us Today!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-green-100"
                >
                  Create your account to start shopping
                </motion.p>
              </motion.div>

              {/* Form Content */}
              <div className="p-8">
                {/* Social Login Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3 mb-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleSignUp}
                    className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="font-medium text-gray-700">Sign up with Google</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFacebookSignUp}
                    className="w-full flex items-center justify-center gap-3 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="font-medium">Sign up with Facebook</span>
                  </motion.button>
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative mb-6"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
                  </div>
                </motion.div>

                {/* Form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onSubmit={formik.handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      type="email"
                      name="email"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {formik.errors.email}
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      type="password"
                      name="password"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Create a password"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {formik.errors.password}
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.passwordConfirm}
                      type="password"
                      name="passwordConfirm"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Confirm your password"
                    />
                    {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {formik.errors.passwordConfirm}
                      </motion.div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formik.isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block"
                      />
                    ) : (
                      "Create Account"
                    )}
                  </motion.button>
                </motion.form>

                {/* Sign In Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center mt-6 pt-4 border-t border-gray-200"
                >
                  <span className="text-gray-600">Already have an account? </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onSwitchToSignIn}
                    className="text-green-600 font-medium hover:text-green-700 transition-colors"
                  >
                    Sign in here
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Original SignUp component kept for backward compatibility
const SignUp = () => {
  return <SignUpModal isOpen={true} onClose={() => {}} onSwitchToSignIn={() => {}} />;
};

export default SignUp;
export { SignUpModal };

/*
--Formik ile ilgili notlar!

Formik içindeki useFormik() hook'u, handleChange, handleBlur gibi özel isimlere sahip fonksiyonlar döndürür.Eğer bu isimleri değiştirirsem formikin otomatik yaptığı işer işlemez.
formik.handleChange; // Input değişimlerini yönetir
formik.handleBlur;   // Input dışına çıkıldığında çalışır
formik.handleSubmit; // Form gönderildiğinde çalışır

*/

// formu doldurduk fetchregister ile form bilgilerine apiye attık. api bize bir response döndü. içinde tokenlar ve user bilgileri var.
// Token ve user bilgilerini saklamak üzere bir context oluşturduk. Context içinde login fonksiyonunda user ve token bilgilerini set ettik.

