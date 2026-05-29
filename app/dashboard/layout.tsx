"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Leaf, LogOut, LayoutDashboard, Users, FileText } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
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
        setUser(data.user);
        
        // Basic role check routing
        if (pathname.includes('/admin') && data.user.role !== 'admin') {
          router.push('/dashboard/user');
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
    <div className="min-h-screen bg-gray-50/50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex">
        <div className="p-6">
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
          {user?.role === 'admin' ? (
            <>
              <Link href="/dashboard/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/dashboard/admin' ? 'bg-[#25D366]/10 text-[#16A34A]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <LayoutDashboard size={20} /> Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard/user" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/dashboard/user' ? 'bg-[#25D366]/10 text-[#16A34A]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <FileText size={20} /> My Invoices
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
