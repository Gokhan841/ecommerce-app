import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheck, faTimes, faShippingFast, faBox } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  // Sipariş durumları
  const orderStatuses = [
    { value: 'pending', label: 'Beklemede', color: 'text-yellow-600 bg-yellow-100' },
    { value: 'confirmed', label: 'Onaylandı', color: 'text-blue-600 bg-blue-100' },
    { value: 'shipped', label: 'Kargoda', color: 'text-purple-600 bg-purple-100' },
    { value: 'delivered', label: 'Teslim Edildi', color: 'text-green-600 bg-green-100' },
    { value: 'cancelled', label: 'İptal Edildi', color: 'text-red-600 bg-red-100' }
  ];

  // Siparişleri getir
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/order`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Siparişler getirilirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Sipariş durumunu güncelle
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchOrders(); // Listeyi yenile
        alert('Sipariş durumu başarıyla güncellendi!');
      } else {
        alert('Sipariş durumu güncellenirken hata oluştu!');
      }
    } catch (error) {
      console.error('Sipariş durumu güncellenirken hata:', error);
      alert('Sipariş durumu güncellenirken hata oluştu!');
    }
  };

  // Sipariş detayını göster
  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  // Toplam tutarı hesapla
  const calculateOrderTotal = (items) => {
    return items?.reduce((total, item) => {
      return total + (item.price * item.quantity || 0);
    }, 0) || 0;
  };

  // Durumu rengine göre göster
  const getStatusBadge = (status) => {
    const statusInfo = orderStatuses.find(s => s.value === status) || orderStatuses[0];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sipariş Yönetimi</h1>
          <p className="text-gray-600 mt-1">Müşteri siparişlerini görüntüleyin ve yönetin</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Toplam: {orders.length} sipariş
          </span>
        </div>
      </div>

      {/* Sipariş Özeti Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {orderStatuses.map((status) => {
          const count = orders.filter(order => order.status === status.value).length;
          return (
            <div key={status.value} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{status.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <FontAwesomeIcon 
                  icon={status.value === 'shipped' ? faShippingFast : faBox} 
                  className={`text-2xl ${status.color.split(' ')[0]}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Sipariş Listesi */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Siparişler</h2>
          {loading ? (
            <div className="text-center py-4">Yükleniyor...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-4 text-gray-500">Henüz sipariş bulunmamaktadır.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Sipariş ID</th>
                    <th className="px-4 py-2 text-left">Müşteri</th>
                    <th className="px-4 py-2 text-left">Ürün Sayısı</th>
                    <th className="px-4 py-2 text-left">Toplam Tutar</th>
                    <th className="px-4 py-2 text-left">Durum</th>
                    <th className="px-4 py-2 text-left">Tarih</th>
                    <th className="px-4 py-2 text-left">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-mono text-sm">
                        #{order._id.slice(-6)}
                      </td>
                      <td className="px-4 py-2">
                        <div>
                          <p className="font-semibold">{order.user?.email || 'Bilinmiyor'}</p>
                          <p className="text-sm text-gray-500">{order.adress}</p>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {order.items?.length || 0} ürün
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        ₺{calculateOrderTotal(order.items).toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        {getStatusBadge(order.status || 'pending')}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => showOrderDetails(order)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Detayları Görüntüle"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          
                          {order.status !== 'delivered' && order.status !== 'cancelled' && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order._id, 'confirmed')}
                                className="text-green-500 hover:text-green-700"
                                title="Onayla"
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                              <button
                                onClick={() => updateOrderStatus(order._id, 'shipped')}
                                className="text-purple-500 hover:text-purple-700"
                                title="Kargoya Ver"
                              >
                                <FontAwesomeIcon icon={faShippingFast} />
                              </button>
                              <button
                                onClick={() => updateOrderStatus(order._id, 'cancelled')}
                                className="text-red-500 hover:text-red-700"
                                title="İptal Et"
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Sipariş Detay Modal */}
      {showOrderDetail && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Sipariş Detayı #{selectedOrder._id.slice(-6)}
              </h2>
              <button
                onClick={() => setShowOrderDetail(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Müşteri Bilgileri */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Müşteri Bilgileri</h3>
                <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
                <p><strong>Adres:</strong> {selectedOrder.adress}</p>
                <p><strong>Sipariş Tarihi:</strong> {new Date(selectedOrder.createdAt).toLocaleString('tr-TR')}</p>
                <p><strong>Durum:</strong> {getStatusBadge(selectedOrder.status || 'pending')}</p>
              </div>

              {/* Sipariş İçeriği */}
              <div>
                <h3 className="font-semibold mb-2">Sipariş İçeriği</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                      <div className="flex items-center space-x-3">
                        {item.photos && item.photos[0] && (
                          <img
                            src={item.photos[0]}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-600">
                            {item.quantity} adet × ₺{item.price}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        ₺{(item.quantity * item.price).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Toplam:</span>
                    <span className="text-lg font-bold">
                      ₺{calculateOrderTotal(selectedOrder.items).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Durum Güncelleme */}
              {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Sipariş Durumunu Güncelle</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder._id, 'confirmed');
                        setShowOrderDetail(false);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder._id, 'shipped');
                        setShowOrderDetail(false);
                      }}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Kargoya Ver
                    </button>
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder._id, 'delivered');
                        setShowOrderDetail(false);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Teslim Edildi
                    </button>
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder._id, 'cancelled');
                        setShowOrderDetail(false);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      İptal Et
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;