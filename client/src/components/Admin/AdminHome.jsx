import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faShoppingBag, faUsers, faDollarSign } from "@fortawesome/free-solid-svg-icons";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // API'lardan istatistikleri getir
    const fetchStats = async () => {
      try {
        // Ürün sayısını getir
        const productsResponse = await fetch(`${import.meta.env.VITE_API_URL}/product`);
        const products = await productsResponse.json();
        
        // Sipariş sayısını getir  
        const ordersResponse = await fetch(`${import.meta.env.VITE_API_URL}/order`);
        const orders = await ordersResponse.json();

        // Toplam geliri hesapla
        const totalRevenue = orders.reduce((total, order) => {
          return total + order.items?.reduce((orderTotal, item) => {
            return orderTotal + (item.price * item.quantity || 0);
          }, 0) || 0;
        }, 0);

        setStats({
          totalProducts: products.length || 0,
          totalOrders: orders.length || 0,
          totalUsers: orders.length || 0, // Unique user count için backend'de ayrı endpoint gerekebilir
          totalRevenue: totalRevenue
        });
      } catch (error) {
        console.error('İstatistikler alınırken hata:', error);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ icon, title, value, color }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
          <FontAwesomeIcon icon={icon} className={`text-2xl ${color.replace('border-l-', 'text-')}`} />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">E-ticaret sitenizin genel görünümü</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={faShoppingBag}
          title="Toplam Ürün"
          value={stats.totalProducts}
          color="border-l-blue-500"
        />
        <StatCard
          icon={faBox}
          title="Toplam Sipariş"
          value={stats.totalOrders}
          color="border-l-green-500"
        />
        <StatCard
          icon={faUsers}
          title="Toplam Müşteri"
          value={stats.totalUsers}
          color="border-l-purple-500"
        />
        <StatCard
          icon={faDollarSign}
          title="Toplam Gelir"
          value={`₺${stats.totalRevenue.toLocaleString()}`}
          color="border-l-yellow-500"
        />
      </div>

      {/* Son Aktiviteler */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Son Aktiviteler</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-50 rounded">
            <FontAwesomeIcon icon={faBox} className="text-green-500 mr-3" />
            <span className="text-gray-700">Yeni sipariş alındı</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded">
            <FontAwesomeIcon icon={faShoppingBag} className="text-blue-500 mr-3" />
            <span className="text-gray-700">Yeni ürün eklendi</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded">
            <FontAwesomeIcon icon={faUsers} className="text-purple-500 mr-3" />
            <span className="text-gray-700">Yeni üye kaydı</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;