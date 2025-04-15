import React from 'react';
import { useAuth } from '../contexts/Auth';

const Profile = () => {
  const { user, logout } = useAuth(); // Kullanıcı bilgilerini Auth context'ten alıyoruz

  const handleLogout = () => {
    logout();
  }


  return (
    <div className="min-h-screen bg-pale-rose flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-gray">Profile</h2>
          <p className="mt-2 text-sm text-slate-gray">Your account details</p>
        </div>

        {/* Kullanıcı Bilgileri */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-slate-gray">Email:</span>
            <span className="text-slate-gray">{user?.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-slate-gray">Role:</span>
            <span className="text-slate-gray">{user?.role}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-slate-gray">User ID:</span>
            <span className="text-slate-gray">{user?._id}</span>
          </div>
        </div>

        {/* Edit Profil Butonu */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout }
            className="w-full py-2 px-4 bg-light-peach text-slate-gray font-medium rounded-lg transition-all hover:bg-warm-beige hover:text-white"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
