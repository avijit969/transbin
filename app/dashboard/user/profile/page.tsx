"use client";

import { useEffect, useState } from "react";
import { User, Mail, Shield, CheckCircle2 } from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.userData);
        }
      } catch (e) {}
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div className="animate-pulse w-full h-64 bg-gray-200 rounded-3xl"></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">View your personal account details.</p>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-3xl bg-white shadow-xl shadow-gray-100/50 max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#86EFAC] to-[#25D366] flex items-center justify-center text-white font-extrabold text-4xl shadow-xl shadow-[#25D366]/20 mb-4">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider mt-2">
            <User size={14} /> Standard {user.role}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="p-3 bg-white text-gray-400 rounded-xl shadow-sm">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Full Name</p>
              <p className="font-bold text-gray-900">{user.name || 'Not provided'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="p-3 bg-white text-gray-400 rounded-xl shadow-sm">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Email Address</p>
              <p className="font-bold text-gray-900">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/10">
            <div className="p-3 bg-white text-[#25D366] rounded-xl shadow-sm">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#16A34A]">Account Status</p>
              <p className="font-bold text-gray-900">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
