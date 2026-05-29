"use client";

import { useEffect, useState, useMemo } from "react";
import { FileText, Download, ExternalLink, Calendar, Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 6;

export default function UserDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

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

  // Filter & Paginate Logic
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv: any) => {
      const matchesSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "all" || inv.fileType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [invoices, searchQuery, typeFilter]);

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE) || 1;
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">My Invoices</h1>
        <p className="text-gray-600">View and download your assigned invoices here.</p>
      </div>

      <div className="glass-panel p-6 md:p-8 rounded-3xl bg-white shadow-xl shadow-gray-100/50 min-h-[500px]">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex w-full md:w-auto flex-1 gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by Invoice ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] outline-none text-sm"
              />
            </div>
            <div className="w-40">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full h-[42px] bg-gray-50 border-gray-200 rounded-xl focus:ring-[#25D366]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[#25D366] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : paginatedInvoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No invoices found</h3>
            <p className="text-gray-500">We couldn't find any invoices matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedInvoices.map((invoice: any) => (
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

        {/* Pagination Controls */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredInvoices.length)} of {filteredInvoices.length} entries
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
