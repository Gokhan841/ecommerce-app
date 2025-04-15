import { Routes, Route, Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBox, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const AdminPanel = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-xl font-bold text-gray-300">Admin Panel</h2>
        <ul className="space-y-2 text-lg">
          <li>
            <Link className="block p-2 hover:bg-gray-700 rounded" to="/admin">
              <FontAwesomeIcon className="mr-2" icon={faHouse} /> Home
            </Link>
          </li>
          <li>
            <Link className="block p-2 hover:bg-gray-700 rounded" to="/admin/orders">
              <FontAwesomeIcon className="mr-2" icon={faBox} /> Orders
            </Link>
          </li>
          <li>
            <Link className="block p-2 hover:bg-gray-700 rounded" to="/admin/products">
              <FontAwesomeIcon className="mr-2" icon={faShoppingBag} /> Products
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <Outlet /> {/* Buraya bağlı olan sayfalar burada gösterilecek */}
      </div>
    </div>
  );
};

export default AdminPanel;
