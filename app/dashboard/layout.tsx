"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Leaf, LogOut, LayoutDashboard, Users, FileText, UserCircle, Menu, X } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data.userData);
        
        // Basic role check routing
        if (pathname.startsWith('/dashboard/superadmin') && data.userData.role !== 'superadmin') {
          router.push(data.userData.role === 'admin' ? '/dashboard/admin' : '/dashboard/user');
        } else if (pathname.startsWith('/dashboard/admin') && data.userData.role !== 'admin') {
          router.push(data.userData.role === 'superadmin' ? '/dashboard/superadmin' : '/dashboard/user');
        } else if (pathname.startsWith('/dashboard/user') && data.userData.role !== 'user') {
          router.push(data.userData.role === 'superadmin' ? '/dashboard/superadmin' : '/dashboard/admin');
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router, pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-10 h-10 border-4 border-[#25D366] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between z-20 sticky top-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#25D366] p-1.5 rounded-full text-white">
            <Leaf size={16} />
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">
            TrashBin
          </span>
        </Link>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-gray-600 bg-gray-50 rounded-lg">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-gray-100 flex-col md:flex fixed md:sticky top-0 h-screen z-10 transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 hidden md:block">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#25D366] p-2 rounded-full text-white">
              <Leaf size={20} />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              TrashBin
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {user?.role === 'superadmin' ? (
            <>
              <Link href="/dashboard/superadmin" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/dashboard/superadmin' ? 'bg-[#25D366]/10 text-[#16A34A]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <LayoutDashboard size={20} /> Overview
              </Link>
              <Link href="/dashboard/superadmin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/dashboard/superadmin/users' ? 'bg-[#25D366]/10 text-[#16A34A]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Users size={20} /> Manage Users
              </Link>
              <Link href="/dashboard/superadmin/profile" onClick={() => setIsMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/dashboard/superadmin/profile' ? 'bg-[#25D366]/10 text-[#16A34A]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <UserCircle size={20} /> Profile
              </Link>
            </>
          ) : user?.role === 'admin' ? (
            <>
              <Link href="/dashboard/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/dashboard/admin' ? 'bg-[#25D366]/10 text-[#16A34A]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <LayoutDashboard size={20} /> Overview
              </Link>
              <Link href="/dashboard/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/dashboard/admin/users' ? 'bg-[#25D366]/10 text-[#16A34A]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Users size={20} /> Manage Users
              </Link>
              <Link href="/dashboard/admin/invoices" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/dashboard/admin/invoices' ? 'bg-[#25D366]/10 text-[#16A34A]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <FileText size={20} /> Invoices
              </Link>
              <Link href="/dashboard/admin/profile" onClick={() => setIsMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/dashboard/admin/profile' ? 'bg-[#25D366]/10 text-[#16A34A]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <UserCircle size={20} /> Profile
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard/user" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/dashboard/user' ? 'bg-[#25D366]/10 text-[#16A34A]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <FileText size={20} /> My Invoices
              </Link>
              <Link href="/dashboard/user/profile" onClick={() => setIsMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/dashboard/user/profile' ? 'bg-[#25D366]/10 text-[#16A34A]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <UserCircle size={20} /> Profile
              </Link>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#86EFAC] to-[#25D366] flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
