"use client";

import { useEffect, useState } from "react";
import { FileText, Download, ExternalLink, Calendar, FileType } from "lucide-react";

export default function UserDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch("/api/user/invoices");
        const data = await res.json();
        if (res.ok) setInvoices(data.invoices || []);
      } catch (error) {
        console.error("Failed to fetch invoices", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">My Invoices</h1>
        <p className="text-gray-600">View and download your assigned invoices here.</p>
      </div>

      <div className="glass-panel p-6 md:p-8 rounded-3xl bg-white shadow-xl shadow-gray-100/50 min-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[#25D366] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No invoices found</h3>
            <p className="text-gray-500">You don't have any invoices assigned yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {invoices.map((invoice: any) => (
              <div key={invoice.id} className="border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-shadow bg-gray-50/50 group flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                      <FileText size={24} />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600 uppercase tracking-wide">
                      {invoice.fileType}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                    Invoice #{invoice.id.substring(0, 8)}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Calendar size={14} />
                    {new Date(invoice.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={invoice.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:text-[#25D366] hover:border-[#25D366] transition-all"
                  >
                    <ExternalLink size={16} /> View
                  </a>
                  <a
                    href={invoice.fileUrl}
                    download
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1FAF57] shadow-md shadow-[#25D366]/20 transition-all"
                  >
                    <Download size={16} /> Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
