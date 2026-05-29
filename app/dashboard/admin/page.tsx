"use client";

import { useState, useEffect } from "react";
import { UserPlus, UploadCloud, Users, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  // Create User State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [userMsg, setUserMsg] = useState({ type: "", text: "" });
  const [isCreating, setIsCreating] = useState(false);

  // Upload Invoice State
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadMsg, setUploadMsg] = useState({ type: "", text: "" });
  const [isUploading, setIsUploading] = useState(false);

  // Fetch users for dropdown
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok) setUsersList(data.users || []);
    } catch (e) {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setUserMsg({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create user");

      setUserMsg({ type: "success", text: "User created successfully!" });
      setName(""); setEmail(""); setPassword(""); setRole("user");
      fetchUsers(); // Refresh dropdown
    } catch (error: any) {
      setUserMsg({ type: "error", text: error.message });
    } finally {
      setIsCreating(false);
    }
  };

  const handleUploadInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedUser) {
      setUploadMsg({ type: "error", text: "Please select a user and a file." });
      return;
    }

    setIsUploading(true);
    setUploadMsg({ type: "", text: "" });

    const formData = new FormData();
    formData.append("userId", selectedUser);
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setUploadMsg({ type: "success", text: "Invoice uploaded successfully!" });
      setFile(null); setSelectedUser("");
      
      // Reset file input
      const fileInput = document.getElementById('invoice-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: any) {
      setUploadMsg({ type: "error", text: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users and upload invoices seamlessly.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Create User Card */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl bg-white shadow-xl shadow-gray-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <UserPlus size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Create New User</h2>
          </div>

          {userMsg.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${userMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              <div className="flex items-center gap-2">
                {userMsg.type === 'success' && <CheckCircle2 size={16} />}
                {userMsg.text}
              </div>
            </div>
          )}

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] transition-all outline-none" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] transition-all outline-none" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} minLength={6} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] transition-all outline-none" placeholder="••••••" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
              <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] transition-all outline-none">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" disabled={isCreating} className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-all disabled:opacity-70">
              {isCreating ? "Creating..." : "Create User"}
            </button>
          </form>
        </div>

        {/* Upload Invoice Card */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl bg-white shadow-xl shadow-gray-100/50 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <UploadCloud size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Upload Invoice</h2>
          </div>

          {uploadMsg.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${uploadMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              <div className="flex items-center gap-2">
                {uploadMsg.type === 'success' && <CheckCircle2 size={16} />}
                {uploadMsg.text}
              </div>
            </div>
          )}

          <form onSubmit={handleUploadInvoice} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Assign to User</label>
              <select required value={selectedUser} onChange={e => setSelectedUser(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] transition-all outline-none">
                <option value="" disabled>Select a user</option>
                {usersList.filter((u: any) => u.role === 'user').map((u: any) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Invoice File (PDF or Image)</label>
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

            <button type="submit" disabled={isUploading} className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:bg-[#1FAF57] shadow-lg shadow-[#25D366]/20 transition-all disabled:opacity-70">
              {isUploading ? "Uploading..." : "Upload & Assign"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
