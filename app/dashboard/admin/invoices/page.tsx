"use client";

import { useState, useEffect, useMemo } from "react";
import { UploadCloud, CheckCircle2, FileText, ExternalLink, Calendar, Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 8;

export default function ManageInvoices() {
  const queryClient = useQueryClient();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Upload Invoice State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadMsg, setUploadMsg] = useState({ type: "", text: "" });

  const { data: usersData } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      return res.json();
    }
  });

  const { data: invoicesData } = useQuery({
    queryKey: ['admin-invoices-all'],
    queryFn: async () => {
      const res = await fetch("/api/admin/invoices/all");
      return res.json();
    }
  });

  const usersList = usersData?.users || [];
  const invoices = invoicesData?.invoices || [];

  // Filter & Paginate Logic
  const filteredInvoices = useMemo(() => {
    return invoices?.filter((inv: any) => {
      const targetName = inv.user?.name || "";
      const targetEmail = inv.user?.email || "";
      const matchesSearch = targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        targetEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "all" || inv.fileType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [invoices, searchQuery, typeFilter]);

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE) || 1;
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter]);

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      return data;
    },
    onSuccess: () => {
      setUploadMsg({ type: "success", text: "Invoice uploaded successfully!" });
      setFile(null);
      setSelectedUser("");

      const fileInput = document.getElementById('invoice-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      queryClient.invalidateQueries({ queryKey: ['admin-invoices-all'] });

      setTimeout(() => {
        setIsDialogOpen(false);
        setUploadMsg({ type: "", text: "" });
      }, 1500);
    },
    onError: (error: any) => {
      setUploadMsg({ type: "error", text: error.message });
    }
  });

  const handleUploadInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedUser) {
      setUploadMsg({ type: "error", text: "Please select a user and a file." });
      return;
    }
    setUploadMsg({ type: "", text: "" });
    const formData = new FormData();
    formData.append("userId", selectedUser);
    formData.append("file", file);
    uploadMutation.mutate(formData);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Manage Invoices</h1>
        <p className="text-gray-600">Upload new invoices and view history.</p>
      </div>

      <div className="glass-panel p-6 md:p-8 rounded-3xl bg-white shadow-xl shadow-gray-100/50 min-h-[500px]">

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex w-full md:w-auto flex-1 gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search user or ID..."
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

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1FAF57] shadow-lg shadow-[#25D366]/20 transition-all">
                <UploadCloud size={18} /> Upload Invoice
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
              <div className="p-8">
                <DialogHeader className="mb-6 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl w-fit">
                      <UploadCloud size={24} />
                    </div>
                  </div>
                  <DialogTitle className="text-2xl font-extrabold">Upload Invoice</DialogTitle>
                </DialogHeader>

                {uploadMsg.text && (
                  <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${uploadMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    <div className="flex items-center gap-2">
                      {uploadMsg.type === 'success' && <CheckCircle2 size={16} />}
                      {uploadMsg.text}
                    </div>
                  </div>
                )}

                <form onSubmit={handleUploadInvoice} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Assign to User</label>
                    <Select value={selectedUser} onValueChange={setSelectedUser} required>
                      <SelectTrigger className="w-full h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-[#25D366]">
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Users</SelectLabel>
                          {usersList.filter((u: any) => u.role === 'user').map((u: any) => (
                            <SelectItem key={u.id} value={u.id}>
                              {u.name} ({u.email})
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice File</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#25D366] transition-colors bg-gray-50">
                      <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label htmlFor="invoice-file" className="relative cursor-pointer rounded-md font-medium text-[#25D366] hover:text-[#1FAF57] focus-within:outline-none">
                            <span>Upload a file</span>
                            <input id="invoice-file" name="invoice-file" type="file" required accept=".pdf,image/*" className="sr-only" onChange={e => setFile(e.target.files?.[0] || null)} />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          {file ? file.name : "PNG, JPG, PDF up to 10MB"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={uploadMutation.isPending} className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:bg-[#1FAF57] shadow-lg shadow-[#25D366]/20 transition-all disabled:opacity-70">
                    {uploadMutation.isPending ? "Uploading..." : "Upload & Assign"}
                  </button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* All Invoices List */}
        {paginatedInvoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
              <FileText size={32} />
            </div>
            <p className="text-gray-500">No invoices found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedInvoices.map((inv: any) => (
              <div key={inv.id} className="border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-shadow bg-gray-50/50 group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600 uppercase tracking-wide">
                      {inv.fileType}
                    </span>
                    <a href={inv.fileUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#25D366] transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                    To: {inv.user?.name || inv.user?.email}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">ID: {inv.id.substring(0, 8)}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <Calendar size={14} />
                  {new Date(inv.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
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
