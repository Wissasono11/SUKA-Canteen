import React, { useState } from "react";

function Pesenan() {
  const [orders, setOrders] = useState([
    {
      id: "#ORD-12345",
      date: "26 May, 10:30",
      customer: {
        name: "INARA RUSLI",
        role: "Mahasiswa",
        avatar: "👩‍🦱",
      },
      menu: "Nasi goreng Spesial, Es Teh",
      total: "Rp. 30.000",
      status: "Sedang diproses",
      statusclassName: "text-yellow-600",
    },
    {
      id: "#ORD-12344",
      date: "26 May, 10:15",
      customer: {
        name: "Aisyah Ayudia",
        role: "Mahasiswa",
        avatar: "👩‍🦳",
      },
      menu: "Bakso Spesial, Es Jeruk",
      total: "Rp. 25.000",
      status: "Siap Diambil",
      statusclassName: "text-blue-600",
    },
    {
      id: "#ORD-12343",
      date: "26 May, 09:45",
      customer: {
        name: "Naraai",
        role: "Mahasiswa",
        avatar: "👱‍♀️",
      },
      menu: "Mie Ayam, Es Jeruk",
      total: "Rp. 20.000",
      status: "Selesai",
      statusclassName: "text-green-600",
    },
  ]);

  const showOrderMenu = (orderId) => {
    console.log("Menu clicked for order:", orderId);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              statusclassName:
                newStatus === "Sedang diproses"
                  ? "text-yellow-600"
                  : newStatus === "Siap Diambil"
                  ? "text-blue-600"
                  : "text-green-600",
            }
          : order
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Pesanan terbaru
          </h1>
          <button
            className="text-green-600 hover:text-green-700 font-medium transition-colors"
            onClick={() => console.log("Lihat semua clicked")}
          >
            Lihat semua
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    NO. PESANAN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    PELANGGAN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    MENU
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    TOTAL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.id}
                      </div>
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <span className="text-sm">{order.customer.avatar}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customer.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{order.menu}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.total}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${order.statusclassName}`}>
                        {order.status}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      {/* Dropdown untuk update status */}
                      <select
                        className="border rounded px-2 py-1 text-sm"
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                      >
                        <option value="Sedang diproses">Sedang diproses</option>
                        <option value="Siap Diambil">Siap Diambil</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pesenan;
