import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    photos: ['']
  });

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

  // Ürünleri getir
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/product`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Ürünler getirilirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Yeni ürün ekle
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        photos: JSON.stringify(newProduct.photos.filter(photo => photo.trim() !== ''))
      };

      const response = await fetch(`${API_BASE_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        setNewProduct({ title: '', description: '', price: '', photos: [''] });
        setShowAddForm(false);
        fetchProducts(); // Listeyi yenile
        alert('Ürün başarıyla eklendi!');
      } else {
        alert('Ürün eklenirken hata oluştu!');
      }
    } catch (error) {
      console.error('Ürün eklenirken hata:', error);
      alert('Ürün eklenirken hata oluştu!');
    }
  };

  // Ürün güncelle
  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        setEditingProduct(null);
        fetchProducts(); // Listeyi yenile
        alert('Ürün başarıyla güncellendi!');
      } else {
        alert('Ürün güncellenirken hata oluştu!');
      }
    } catch (error) {
      console.error('Ürün güncellenirken hata:', error);
      alert('Ürün güncellenirken hata oluştu!');
    }
  };

  // Ürün sil
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          fetchProducts(); // Listeyi yenile
          alert('Ürün başarıyla silindi!');
        } else {
          alert('Ürün silinirken hata oluştu!');
        }
      } catch (error) {
        console.error('Ürün silinirken hata:', error);
        alert('Ürün silinirken hata oluştu!');
      }
    }
  };

  // Fotoğraf URL'i ekle
  const addPhotoUrl = () => {
    setNewProduct({
      ...newProduct,
      photos: [...newProduct.photos, '']
    });
  };

  // Fotoğraf URL'i kaldır
  const removePhotoUrl = (index) => {
    const updatedPhotos = newProduct.photos.filter((_, i) => i !== index);
    setNewProduct({
      ...newProduct,
      photos: updatedPhotos.length > 0 ? updatedPhotos : ['']
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Ürün Yönetimi</h1>
          <p className="text-gray-600 mt-1">Ürünlerinizi ekleyin, güncelleyin ve silin</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Yeni Ürün Ekle
        </button>
      </div>

      {/* Yeni Ürün Ekleme Formu */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Yeni Ürün Ekle</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ürün Adı
              </label>
              <input
                type="text"
                required
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Açıklama
              </label>
              <textarea
                required
                rows="3"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fiyat (₺)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fotoğraf URL'leri
              </label>
              {newProduct.photos.map((photo, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="url"
                    value={photo}
                    onChange={(e) => {
                      const updatedPhotos = [...newProduct.photos];
                      updatedPhotos[index] = e.target.value;
                      setNewProduct({ ...newProduct, photos: updatedPhotos });
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {newProduct.photos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhotoUrl(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addPhotoUrl}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                + Fotoğraf URL'i Ekle
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Ürünü Kaydet
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-lg flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ürün Listesi */}
      <div className="bg-white rounded-lg shadow-lg border border-blue-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Mevcut Ürünler</h2>
          {loading ? (
            <div className="text-center py-4">Yükleniyor...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-4 text-gray-500">Henüz ürün bulunmamaktadır.</div>
          ) : (
            <div className="overflow-x-auto max-h-[36rem] overflow-y-auto border border-blue-200 rounded-lg shadow-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-white font-semibold">Fotoğraf</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Ürün Adı</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Açıklama</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Fiyat</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b border-blue-100 hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-4 py-2">
                        {product.photos && product.photos.length > 0 && (
                          <img
                            src={product.photos[0]}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                      </td>
                      <td className="px-4 py-2 font-semibold">{product.title}</td>
                      <td className="px-4 py-2">
                        {product.description.length > 50
                          ? `${product.description.substring(0, 50)}...`
                          : product.description}
                      </td>
                      <td className="px-4 py-2">₺{product.price}</td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProduct({
                              ...product,
                              photos: product.photos ? 
                                (Array.isArray(product.photos) ? product.photos : JSON.parse(product.photos)) 
                                : ['']
                            })}
                            className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-all duration-200"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-all duration-200"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
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

      {/* Düzenleme Modal'ı */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 shadow-xl border border-blue-200 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Ürün Düzenle</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct(editingProduct._id, {
                  title: editingProduct.title,
                  description: editingProduct.description,
                  price: editingProduct.price,
                  photos: JSON.stringify(editingProduct.photos.filter(photo => photo.trim() !== ''))
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ürün Adı
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  required
                  rows="3"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fiyat (₺)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fotoğraf URL'leri
                </label>
                {editingProduct.photos && editingProduct.photos.map((photo, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="url"
                      value={photo}
                      onChange={(e) => {
                        const updatedPhotos = [...editingProduct.photos];
                        updatedPhotos[index] = e.target.value;
                        setEditingProduct({ ...editingProduct, photos: updatedPhotos });
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {editingProduct.photos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updatedPhotos = editingProduct.photos.filter((_, i) => i !== index);
                          setEditingProduct({ 
                            ...editingProduct, 
                            photos: updatedPhotos.length > 0 ? updatedPhotos : [''] 
                          });
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct({
                      ...editingProduct,
                      photos: [...editingProduct.photos, '']
                    });
                  }}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  + Fotoğraf URL'i Ekle
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faSave} className="mr-2" />
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-lg flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faTimes} className="mr-2" />
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;