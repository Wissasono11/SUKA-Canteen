import React, { useEffect } from "react";
import Chart from "chart.js/auto";

function LoginOwn() {
  useEffect(() => {
    class PasswordToggle {
      constructor(inputId, buttonId, iconId) {
        this.passwordInput = document.getElementById(inputId);
        this.toggleButton = document.getElementById(buttonId);
        this.eyeIcon = document.getElementById(iconId);
        this.isVisible = false;

        this.init();
      }

      init() {
        if (!this.passwordInput || !this.toggleButton || !this.eyeIcon) return;

        this.toggleButton.addEventListener("click", () => this.toggleVisibility());
        this.toggleButton.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.toggleVisibility();
          }
        });
        this.updateIcon();
      }

      toggleVisibility() {
        this.isVisible = !this.isVisible;
        this.passwordInput.type = this.isVisible ? "text" : "password";
        this.updateIcon();
        this.addRippleEffect();
      }

      updateIcon() {
        if (!this.eyeIcon) return;

        if (this.isVisible) {
          this.eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
          `;
          this.eyeIcon.classList.add("text-green-primary");
          this.eyeIcon.classList.remove("text-gray-400");
        } else {
          this.eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          `;
          this.eyeIcon.classList.remove("text-green-primary");
          this.eyeIcon.classList.add("text-gray-400");
        }
      }

      addRippleEffect() {
        if (!this.toggleButton) return;

        this.toggleButton.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.toggleButton.style.transform = "scale(1)";
        }, 100);
      }
    }

    // Inisialisasi password toggles
    new PasswordToggle("password", "togglePassword", "eyeIconPassword");
    new PasswordToggle("confirmPassword", "toggleConfirmPassword", "eyeIconConfirm");

    // Tambahkan efek ring pada input saat focus
    const form = document.querySelector("form");
    if (form) {
      const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
      inputs.forEach((input) => {
        input.addEventListener("focus", function () {
          this.parentElement.classList.add("ring-2", "ring-green-primary");
        });

        input.addEventListener("blur", function () {
          this.parentElement.classList.remove("ring-2", "ring-green-primary");
        });
      });
    }
  }, []);
    return (
        <div className="bg-gray-50 min-h-screen">
    <header className="bg-white shadow-sm px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <img src="./img/logo.png" alt="logo" className="h-10 "/>
            <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">Sudah Punya Akun?</span>
                <a href="./login.html" className="text-green-primary hover:text-green-dark font-medium">Masuk</a>
            </div>
        </div>
    </header>

    <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* <!-- Illustration --> */}
            <div className="hidden lg:block relative">
                <img src="./img/illustration.png" alt="Illustration"/>
            </div>

            {/* <!-- Form --> */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">BUAT AKUN BARU</h1>
                    <div className="inline-block bg-green-100 text-green-primary px-4 py-2 rounded-full text-sm font-medium">
                        PEMILIK KANTIN
                    </div>
                </div>

                <form className="space-y-6" action="./login.html">
                    {/* <!-- Nama Lengkap --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">NAMA LENGKAP</label>
                        <input type="text" placeholder="Masukkan nama anda" 
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-all duration-200"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">NOMOR TELEPON</label>
                        <input type="text" placeholder="Masukkan nomor anda" 
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-all duration-200"/>
                    </div>

                    {/* <!-- Email --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">EMAIL</label>
                        <input type="email" placeholder="Masukkan email anda" 
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-all duration-200"/>
                    </div>

                    {/* <!-- Kata Sandi --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi</label>
                        <div className="relative">
                            <input type="password" id="password" placeholder="Masukkan kata sandi anda" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-all duration-200 pr-12"/>
                            <button type="button" id="togglePassword"className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                <svg id="eyeIconPassword" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* <!-- Konfirmasi Kata Sandi --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Kata Sandi</label>
                        <div className="relative">
                            <input type="password" id="confirmPassword" placeholder="Konfirmasi kata sandi anda" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-all duration-200 pr-12"/>
                            <button type="button" id="toggleConfirmPassword"className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                <svg id="eyeIconConfirm" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* <!-- Terms Checkbox --> */}
                    <div className="flex items-start space-x-3">
                        <input type="checkbox" id="terms" className="mt-1 h-4 w-4 text-green-primary focus:ring-green-primary border-gray-300 rounded"/>
                        <label for="terms" className="text-sm text-gray-600">
                            Saya setuju dengan syarat dan ketentuan SUKA-Canteen
                        </label>
                    </div>

                    {/* <!-- Submit Button --> */}
                    <button type="submit" 
                            className="w-full bg-green-primary hover:bg-green-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-[1.02]">
                        Daftar Sekarang
                    </button>
                </form>

                {/* <!-- Social Login --> */}
                <div className="mt-8">
                    <div className="text-center text-sm text-gray-500 mb-4">atau daftar dengan</div>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="./login.html" className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors duration-200">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span className="text-sm font-medium">Google</span>
                        </a>
                        <a href="./login.html" className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors duration-200">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span className="text-sm font-medium">Facebook</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Mobile Illustration --> */}
    <div className="lg:hidden flex justify-center mt-8 px-4">
        <div className="relative">
            <div className="w-64 h-64 bg-gradient-to-br from-green-100 to-orange-100 rounded-full flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-orange-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">5K</span>
            </div>
        </div>
    </div>

    </div>
    );
}

export default LoginOwn;