import React, { useEffect } from "react";
import Chart from "chart.js/auto";

function Dashboard() {
  useEffect(() => {
    // Popular Menu Doughnut Chart
    const popularMenuCtx = document.getElementById('popularMenuChart')?.getContext('2d');
    let popularChart = null;
    
    if (popularMenuCtx) {
      popularChart = new Chart(popularMenuCtx, {
        type: 'doughnut',
        data: {
          labels: ['Nasi Goreng Spesial', 'Ayam Goreng Crispy', 'Mie Ayam Bakso', 'Es Teh', 'Es Jeruk'],
          datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444'],
            borderWidth: 0,
            cutout: '70%',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        },
      });
    }

    // Weekly Revenue Line Chart
    const weeklyRevenueCtx = document.getElementById('weeklyRevenueChart')?.getContext('2d');
    let revenueChart = null;
    
    if (weeklyRevenueCtx) {
      revenueChart = new Chart(weeklyRevenueCtx, {
        type: 'line',
        data: {
          labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
          datasets: [{
            label: 'Pendapatan (Rp)',
            data: [750000, 820000, 890000, 800000, 950000, 1200000, 1150000],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3B82F6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
            },
            y: {
              beginAtZero: false,
              min: 700000,
              max: 1300000,
              ticks: {
                callback: function (value) {
                  return 'Rp ' + value.toLocaleString();
                },
                stepSize: 100000,
              },
              grid: { color: '#f3f4f6' },
              border: { display: false },
            },
          },
        },
      });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');

    const handleMobileMenuClick = () => {
      sidebar?.classList.toggle('-translate-x-full');
    };

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', handleMobileMenuClick);
    }

    function handleResize() {
      if (!sidebar) return;
      const mainContent = document.querySelector('.main-content');
      if (!mainContent) return;

      if (window.innerWidth < 1024) {
        sidebar.classList.add('-translate-x-full');
        mainContent.classList.remove('ml-64');
      } else {
        sidebar.classList.remove('-translate-x-full');
        mainContent.classList.add('ml-64');
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup function
    return () => {
      if (popularChart) popularChart.destroy();
      if (revenueChart) revenueChart.destroy();
      if (mobileMenuBtn) {
        mobileMenuBtn.removeEventListener('click', handleMobileMenuClick);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <div className="sidebar w-64 bg-white shadow-lg h-full fixed left-0 top-0 z-10 transition-transform duration-300">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="h-10 bg-green-500 rounded flex items-center justify-center text-white font-bold">
            LOGO
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <a href="./dashboard.html" className="flex items-center space-x-3 px-4 py-3 text-green-600 bg-green-50 rounded-lg font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
              </svg>
              <span>Dashboard</span>
            </a>

            <a href="./menu.html" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <span>Kelola Menu</span>
            </a>

            <a href="./pesanan.html" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span>Daftar Pesanan</span>
            </a>

            <a href="./toko.html" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span>Kelola Kantin</span>
            </a>

            <a href="#laporan" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span>Laporan</span>
            </a>
          </div>

          <div className="mt-8 border-t pt-4 px-4">
            <a href="./profil.html" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Profil</span>
            </a>
            <a href="./login.html" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Keluar</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Toggle Button (Mobile) */}
      <button id="mobile-menu-btn" className="md:hidden fixed top-1/2 left-0 -translate-y-1/2 transform bg-green-600 text-white p-2 rounded-r-lg shadow z-20">
        &gt;
      </button>

      {/* Main Content */}
      <div className="main-content flex-1 ml-0 lg:ml-64 overflow-y-auto h-screen">
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="font-semibold text-gray-800">Khansa Cahyono</div>
                <div className="text-sm text-gray-500">Kantin Barokah</div>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <a href="./profil.html" className="text-orange-600 font-bold">KC</a>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">Pesanan Hari Ini</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">34</div>
              <div className="text-green-500 text-sm">+12% dari kemarin</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">Pelanggan Baru</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">8</div>
              <div className="text-green-500 text-sm">+2% dari kemarin</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">Pendapatan hari ini</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">Rp 850.000</div>
              <div className="text-green-500 text-sm">+5% dari kemarin</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">Menu Terjual</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">40</div>
              <div className="text-green-500 text-sm">+3% dari kemarin</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6" id="laporan">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Menu Terpopuler</h3>
              <div className="relative h-64">
                <canvas id="popularMenuChart" className="w-full h-full"></canvas>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <div className="text-2xl font-bold text-gray-800">100%</div>
                  <div className="text-sm text-gray-500">Total Menu</div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Nasi Goreng Spesial</span>
                  </div>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Ayam Goreng Crispy</span>
                  </div>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Mie Ayam Bakso</span>
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Es Teh</span>
                  </div>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Es Jeruk</span>
                  </div>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Pendapatan Mingguan</h3>
              <div className="h-64">
                <canvas id="weeklyRevenueChart" className="w-full h-full"></canvas>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;