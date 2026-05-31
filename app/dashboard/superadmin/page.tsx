"use client";

import { useEffect, useState } from "react";
import { Users, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuperAdminOverview() {
  const [stats, setStats] = useState({ totalUsers: 0, totalInvoices: 0 });
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, invoicesRes] = await Promise.all([
          fetch("/api/superadmin/analytics"),
          fetch("/api/superadmin/invoices/all")
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (invoicesRes.ok) {
          const invoicesData = await invoicesRes.json();
          // Just grab the latest 5 for the overview
          setRecentInvoices(invoicesData.invoices.slice(0, 5));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse flex gap-4"><div className="w-full h-32 bg-gray-200 rounded-2xl"></div><div className="w-full h-32 bg-gray-200 rounded-2xl"></div></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Superadmin Analytics Overview</h1>
        <p className="text-gray-600">A quick glance at platform metrics across all roles.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="glass-panel p-8 rounded-3xl bg-white shadow-xl shadow-gray-100/50 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Users</p>
            <h3 className="text-4xl font-extrabold text-gray-900">{stats.totalUsers}</h3>
          </div>
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Users size={32} />
          </div>
        </div>
        
        <div className="glass-panel p-8 rounded-3xl bg-white shadow-xl shadow-gray-100/50 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Invoices</p>
            <h3 className="text-4xl font-extrabold text-gray-900">{stats.totalInvoices}</h3>
          </div>
          <div className="w-16 h-16 bg-green-50 text-[#25D366] rounded-full flex items-center justify-center">
            <FileText size={32} />
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl bg-white shadow-xl shadow-gray-100/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
        </div>

        {recentInvoices.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No invoices uploaded yet.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentInvoices.map((inv: any) => (
              <div key={inv.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Invoice #{inv.id.substring(0, 6)}</p>
                    <p className="text-sm text-gray-500">Assigned to: {inv.user?.name || inv.user?.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(inv.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
