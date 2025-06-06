import React, { useEffect } from "react";
import Chart from "chart.js/auto";

function Menu() {
    
        let orderItems = [
            { name: 'Nasi goreng', price: 20000, quantity: 2, image: './img/nasgor.png' },
            { name: 'Es teh', price: 5000, quantity: 2, image: './img/esteh.png' }
        ];

        document.getElementById('dineInBtn').addEventListener('click', function() {
            this.classNameList.add('bg-green-primary', 'text-white');
            this.classNameList.remove('text-gray-600');
            document.getElementById('takeawayBtn').classNameList.remove('bg-green-primary', 'text-white');
            document.getElementById('takeawayBtn').classNameList.add('text-gray-600');
        });

        document.getElementById('takeawayBtn').addEventListener('click', function() {
            this.classNameList.add('bg-green-primary', 'text-white');
            this.classNameList.remove('text-gray-600');
            document.getElementById('dineInBtn').classNameList.remove('bg-green-primary', 'text-white');
            document.getElementById('dineInBtn').classNameList.add('text-gray-600');
        });

        // Add item
        function addToOrder(name, price) {
            const existingItem = orderItems.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                orderItems.push({
                    name: name,
                    price: price,
                    quantity: 1,
                    image: './img/esteh.png' // Taruh gambar yg sesuai
                });
            }
            updateOrderDisplay();
        }

        // Update order display
        function updateOrderDisplay() {
            const orderContainer = document.getElementById('orderItems');
            const totalAmount = document.getElementById('totalAmount');
            const finalTotal = document.getElementById('finalTotal');
            
            orderContainer.innerHTML = '';
            let total = 0;
            let totalItems = 0;

            orderItems.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                totalItems += item.quantity;

                orderContainer.innerHTML += `
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <img src="${item.image}" alt="${item.name}" className="w-12 h-12 rounded-lg object-cover"/>
                        <div className="flex-1">
                            <h4 className="font-medium text-sm">${item.name}</h4>
                            <div className="text-xs text-gray-500">Rp ${item.price.toLocaleString()} x ${item.quantity}</div>
                            <div className="flex items-center space-x-2 mt-1">
                                <button onclick="decreaseQuantity(${index})" className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">-</button>
                                <button onclick="increaseQuantity(${index})" className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">+</button>
                            </div>
                        </div>
                        <div className="text-sm font-bold">Rp ${itemTotal.toLocaleString()}</div>
                    </div>
                `;
            });

            totalAmount.textContent = `RP ${total.toLocaleString()}`;
            finalTotal.textContent = `RP ${total.toLocaleString()}`;

            const totalItemsText = document.querySelector('.space-y-2 .flex span');
            if (totalItemsText) {
                totalItemsText.textContent = `Total Pesanan (${totalItems} Menu)`;
            }
        }

        function increaseQuantity(index) {
            orderItems[index].quantity++;
            updateOrderDisplay();
        }

        function decreaseQuantity(index) {
            if (orderItems[index].quantity > 1) {
                orderItems[index].quantity--;
            } else {
                orderItems.splice(index, 1);
            }
            updateOrderDisplay();
        }
        updateOrderDisplay();
    
    return (
        <div className="bg-gray-50">
    <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-4 py-3 w-full max-w-screen-xl mx-auto">
            {/* <!-- Logo --> */}
            <img src="./img/logo.png" alt="logo" className="h-10 "/>

            {/* <!-- Profile Card --> */}
            <div className="relative">
                <div id="profileHeader" className="bg-white rounded-2xl shadow-lg border-2 border-green-primary p-2 cursor-pointer hover:shadow-xl transition-shadow duration-200">
                    <div className="flex items-center justify-between space-x-4">
                        <h1 className="text-xl font-bold text-green-primary">Profile</h1>
                        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                            <img src="./img/ppprofil.jpg" alt="Profile" className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </div>

                {/* <!-- Dropdown --> */}
                <div id="dropdownMenu" className="absolute right-0 w-80 bg-white rounded-2xl shadow-lg border-2 border-gray-200 mt-2 overflow-hidden hidden z-50">
                    <div className="p-6 bg-gray-50 border-b border-gray-200 space-y-4">
                        <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-gray-700"><span className="font-medium">Nama:</span> Aisyah Ayudia</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-700"><span className="font-medium">Email:</span> ayudia271@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span className="text-gray-700"><span className="font-medium">Saldo:</span> Rp24.000</span>
                        </div>
                    </div>

                    {/* <!-- Menu --> */}
                    <div className="py-2">
                        <button className="w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">Riwayat transaksi</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-gray-700">Makanan Favorit</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-gray-700">Pengaturan Akun</span>
                        </button>

                        <div className="border-t border-gray-200 mt-2 pt-2">
                            <button onclick="window.location.href='./login.html'" className="w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-red-50 transition-colors text-red-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Keluar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="./toko.html" className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <img src="./img/daftarKantin.png" alt="kantin" className="w-8 h-8"/>
                    </div>
                    <span className="text-sm font-medium">Daftar Kantin</span>
                </a>
                
                <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <img src="./img/saldo.png" alt="saldo" className="h-8 w-8"/>
                    </div>
                    <span className="text-sm font-medium">Saldo</span>
                </div>
                
                <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <img src="./img/fav.png" alt="fav" className="w-8 h-8"/>
                    </div>
                    <span className="text-sm font-medium">Makan Favorit</span>
                </div>
                
                <a href="order.html" className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <img src="./img/riwayat.png" alt="riwayat" className="h-8 w-8"/>
                    </div>
                    <span className="text-sm font-medium">Riwayat pemesanan</span>
                </a>
            </div>

            {/* <!-- Categories --> */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Categories</h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <input type="text" placeholder="Search menu" className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-primary focus:border-transparent"/>
                            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <button className="bg-green-primary text-white p-2 rounded-lg hover:bg-green-dark transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex space-x-6 mb-6">
                    <div className="flex flex-col items-center cursor-pointer group">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-red-200 transition-colors">
                            <img src="./img/food.png" alt="food"/>
                        </div>
                        <span className="text-sm font-medium text-red-600">Food</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer group">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-pink-200 transition-colors">
                            <img src="./img/drink.png" alt="drink"/>
                        </div>
                        <span className="text-sm font-medium text-pink-600">Drink</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer group">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-orange-200 transition-colors">
                            <img src="./img/desert.png" alt="desert"/>
                        </div>
                        <span className="text-sm font-medium text-orange-600">Dessert</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer group">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-yellow-200 transition-colors">
                            <img src="./img/mkringan.png" alt="ringan"/>
                        </div>
                        <span className="text-sm font-medium text-yellow-600">Side Dish</span>
                    </div>
                </div>

                {/* <!-- Menu Items --> */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* <!-- Bakso --> */}
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer" onclick="addToOrder('Bakso', 20000)">
                        <div className="relative mb-3">
                            <img src="./img/bakso.png" alt="Bakso" className="w-full h-32 object-cover rounded-lg"/>
                            <span className="absolute top-2 left-2 bg-green-primary text-white text-xs px-2 py-1 rounded">Best seller</span>
                        </div>
                        <h3 className="font-semibold mb-1">Bakso</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-green-primary font-bold">RP 20.000</span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <span>⭐ 0</span>
                                <span>👁️ 0</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Chicken Rice --> */}
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer" onclick="addToOrder('Chicken rice', 25000)">
                        <div className="relative mb-3">
                            <img src="./img/nasiayam.png" alt="Chicken Rice" className="w-full h-32 object-cover rounded-lg"/>
                        </div>
                        <h3 className="font-semibold mb-1">Chicken rice</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-green-primary font-bold">RP 25.000</span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <span>⭐ 0</span>
                                <span>👁️ 0</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Salad --> */}
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer" onclick="addToOrder('Salad', 30000)">
                        <div className="relative mb-3">
                            <img src="./img/salad.png" alt="Salad" className="w-full h-32 object-cover rounded-lg"/>
                        </div>
                        <h3 className="font-semibold mb-1">Salad</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-green-primary font-bold">RP 30.000</span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <span>⭐ 0</span>
                                <span>👁️ 0</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Donat --> */}
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer" onclick="addToOrder('Donat', 5000)">
                        <div className="relative mb-3">
                            <img src="./img/donat.png" alt="Donat" className="w-full h-32 object-cover rounded-lg"/>
                        </div>
                        <h3 className="font-semibold mb-1">Donat</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-green-primary font-bold">RP 5.000</span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <span>⭐ 0</span>
                                <span>👁️ 0</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- ES teh --> */}
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer" onclick="addToOrder('ES teh', 8000)">
                        <div className="relative mb-3">
                            <img src="./img/esteh.png" alt="ES teh" className="w-full h-32 object-cover rounded-lg"/>
                            <span className="absolute top-2 left-2 bg-green-primary text-white text-xs px-2 py-1 rounded">Best seller</span>
                        </div>
                        <h3 className="font-semibold mb-1">ES teh</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-green-primary font-bold">RP 8.000</span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <span>⭐ 0</span>
                                <span>👁️ 0</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Nasi goreng special --> */}
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer" onclick="addToOrder('Nasi goreng special', 25000)">
                        <div className="relative mb-3">
                            <img src="./img/nasgor.png" alt="Nasi goreng special" className="w-full h-32 object-cover rounded-lg"/>
                            <span className="absolute top-2 left-2 bg-green-primary text-white text-xs px-2 py-1 rounded">Best seller</span>
                        </div>
                        <h3 className="font-semibold mb-1">Nasi goreng special</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-green-primary font-bold">RP 25.000</span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <span>⭐ 0</span>
                                <span>👁️ 0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Order detail --> */}
        <div className="bg-white lg:col-span-1 rounded-xl p-6 shadow-sm h-fit sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Order detail</h2>
            
            {/* <!-- Order type --> */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                <button id="dineInBtn" className="flex-1 py-2 px-4 text-center rounded-md bg-green-primary text-white font-medium transition-colors">
                    Dine-in
                </button>
                <button id="takeawayBtn" className="flex-1 py-2 px-4 text-center rounded-md text-gray-600 font-medium hover:bg-gray-200 transition-colors">
                    Takeaway
                </button>
            </div>

            {/* <!-- Customer Info --> */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                    <span className="text-gray-600">Customer name</span>
                    <div className="font-medium">Inara</div>
                </div>
                <div>
                    <span className="text-gray-600">Canteen name</span>
                    <div className="font-medium">Barokah</div>
                </div>
                <div className="col-span-2">
                    <span className="text-gray-600">Table number</span>
                    <div className="font-medium">13</div>
                </div>
            </div>

            <hr className="mb-4"/>

            {/* <!-- Order Menu --> */}
            <div className="mb-4">
                <h3 className="font-medium mb-3">Order menu</h3>
                <div id="orderItems" className="space-y-3">
                    {/* <!-- Default--> */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <img src="./img/nasgor.png" alt="Nasi goreng" className="w-12 h-12 rounded-lg object-cover"/>
                        <div className="flex-1">
                            <h4 className="font-medium text-sm">Nasi goreng</h4>
                            <div className="text-xs text-gray-500">Rp 20.000 x 2</div>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs">⭐ 2</span>
                                <span className="text-xs">🍽️ 0</span>
                            </div>
                        </div>
                        <div className="text-sm font-bold">Rp 40.000</div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <img src="./img/esteh.png" alt="Es teh" className="w-12 h-12 rounded-lg object-cover"/>
                        <div className="flex-1">
                            <h4 className="font-medium text-sm">Es teh</h4>
                            <div className="text-xs text-gray-500">Rp 5.000 x 2</div>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs">⭐ 2</span>
                                <span className="text-xs">🍽️ 0</span>
                            </div>
                        </div>
                        <div className="text-sm font-bold">Rp 10.000</div>
                    </div>
                </div>
            </div>

            {/* <!-- Delivery --> */}
            <div className="mb-4 text-sm">
                <span className="text-gray-600">Estimasi pesanan selesai 5-8 min</span>
            </div>

            {/* <!-- Payment --> */}
            <div className="mb-4">
                <h3 className="font-medium mb-2">Pilihan pembayaran</h3>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input type="radio" name="payment" value="cash" className="mr-2" checked/>
                        <span className="text-sm">Cash</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="payment" value="qris" className="mr-2"/>
                        <span className="text-sm">Qris</span>
                    </label>
                </div>
            </div>

            <hr className="mb-4"/>

            {/* <!-- Order Summary --> */}
            <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                    <span className="text-gray-600">Total Pesanan (4 Menu)</span>
                    <span id="totalAmount">RP 50.000</span>
                </div>
                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span id="finalTotal">RP 50.000</span>
                </div>
            </div>

            {/* <!-- Confirm Button --> */}
            <button onclick="window.location.href='order.html'" className="w-full bg-green-primary hover:bg-green-dark text-white font-semibold py-3 rounded-lg transition-colors">
                Confirm
            </button>
        </div>
    </div>
   </div>
    );
}

export default Menu;