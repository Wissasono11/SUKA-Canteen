import React, { useState, useRef, useEffect } from "react";

export default function Login() {
  const [currentUserType, setCurrentUserType] = useState("mahasiswa");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, [currentUserType]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const showToast = (title, message, type = "success") => {
    setToast({ show: true, title, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !dropdownButtonRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src="./img/logo.png" alt="logo" className="h-10" />
          <div className="relative inline-block text-left">
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-600">Belum Punya Akun?</span>
              <button
                ref={dropdownButtonRef}
                onClick={toggleDropdown}
                className="text-green-500 hover:text-green-700 font-medium"
              >
                Daftar
              </button>
            </div>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
              >
                <a href="loginMhs.html" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Daftar Mahasiswa
                </a>
                <a href="loginOwn.html" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Daftar Pemilik Kantin
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="login-card rounded-2xl shadow-2xl p-8 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Masuk Ke Akun Anda</h2>

          <div className="flex mb-6">
            <button
              onClick={() => setCurrentUserType("mahasiswa")}
              className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                currentUserType === "mahasiswa"
                  ? "text-green-600 border-green-500"
                  : "text-gray-500 border-transparent hover:text-green-500"
              }`}
            >
              Mahasiswa
            </button>
            <button
              onClick={() => setCurrentUserType("kantin")}
              className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                currentUserType === "kantin"
                  ? "text-green-600 border-green-500"
                  : "text-gray-500 border-transparent hover:text-green-500"
              }`}
            >
              Pemilik Kantin
            </button>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                placeholder="nama@email.com"
                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-green-500 outline-none transition-colors bg-transparent"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Kata Sandi
                </label>
                <button
                  type="button"
                  className="text-sm text-green-500 hover:text-green-700 transition-colors"
                >
                  Lupa kata Sandi?
                </button>
              </div>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-green-500 outline-none transition-colors bg-transparent pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {isPasswordVisible ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              onClick={() => showToast("Login Berhasil", "Selamat datang kembali!")}
            >
              Masuk
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">atau masuk dengan</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="mr-2">🔍</span>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="mr-2">📘</span>
                Facebook
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">© 2024 SUKA-Canteen. All rights reserved.</p>
        </div>
      </div>

      {toast.show && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded shadow-lg text-white z-50 transition-transform duration-300 transform ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          <strong className="block">{toast.title}</strong>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
