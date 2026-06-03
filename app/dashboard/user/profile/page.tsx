"use client";

import { User, Mail, Shield, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function UserProfile() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      return data.userData;
    }
  });

  if (isLoading || !user) {
    return <div className="animate-pulse w-full h-64 bg-gray-200 rounded-3xl"></div>;
  }

  return (
    <div className="px-2 sm:px-4 md:px-0">
      <div className="mb-6 md:mb-8 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600 text-sm md:text-base">View your personal account details.</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 md:p-12 rounded-3xl bg-white shadow-xl shadow-gray-100/50 max-w-2xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#86EFAC] to-[#25D366] flex items-center justify-center text-white font-extrabold text-3xl md:text-4xl shadow-xl shadow-[#25D366]/20 mb-4 shrink-0">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 px-4 text-center break-words w-full">{user.name}</h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider mt-2">
            <User size={14} /> Standard {user.role}
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 w-full overflow-hidden">
            <div className="p-3 bg-white text-gray-400 rounded-xl shadow-sm self-start sm:self-auto shrink-0 inline-flex w-fit">
              <User size={20} />
            </div>
            <div className="min-w-0 flex-1 break-words">
              <p className="text-sm font-semibold text-gray-500">Full Name</p>
              <p className="font-bold text-gray-900 sm:truncate">{user.name || 'Not provided'}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 w-full overflow-hidden">
            <div className="p-3 bg-white text-gray-400 rounded-xl shadow-sm self-start sm:self-auto shrink-0 inline-flex w-fit">
              <Mail size={20} />
            </div>
            <div className="min-w-0 flex-1 break-words">
              <p className="text-sm font-semibold text-gray-500">Email Address</p>
              <p className="font-bold text-gray-900 sm:truncate">{user.email}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/10 w-full overflow-hidden">
            <div className="p-3 bg-white text-[#25D366] rounded-xl shadow-sm self-start sm:self-auto shrink-0 inline-flex w-fit">
              <CheckCircle2 size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#16A34A]">Account Status</p>
              <p className="font-bold text-gray-900">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
