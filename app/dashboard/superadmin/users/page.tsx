"use client";

import { useState, useEffect, useMemo } from "react";
import { UserPlus, CheckCircle2, Users, Search, ChevronLeft, ChevronRight, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ITEMS_PER_PAGE = 8;

export default function ManageUsers() {
  const queryClient = useQueryClient();
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Create User State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [userMsg, setUserMsg] = useState({ type: "", text: "" });

  // Edit User State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRole, setEditRole] = useState("user");

  // Delete User State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['superadmin-users'],
    queryFn: async () => {
      const res = await fetch("/api/superadmin/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    }
  });

  const usersList = usersData?.users || [];

  // Filter & Paginate Logic
  const filteredUsers = useMemo(() => {
    return usersList.filter((u: any) => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [usersList, searchQuery, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter]);

  const createUserMutation = useMutation({
    mutationFn: async (newUser: any) => {
      const res = await fetch("/api/superadmin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create user");
      return data;
    },
    onSuccess: () => {
      setUserMsg({ type: "success", text: "User created successfully!" });
      setName(""); setEmail(""); setPassword(""); setRole("user");
      queryClient.invalidateQueries({ queryKey: ['superadmin-users'] });
      setTimeout(() => {
        setIsDialogOpen(false);
        setUserMsg({ type: "", text: "" });
      }, 1500);
    },
    onError: (error: any) => {
      setUserMsg({ type: "error", text: error.message });
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: any) => {
      const res = await fetch(`/api/superadmin/users/${editUserId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update user");
      return data;
    },
    onSuccess: () => {
      setUserMsg({ type: "success", text: "User updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ['superadmin-users'] });
      setTimeout(() => {
        setIsEditDialogOpen(false);
        setUserMsg({ type: "", text: "" });
      }, 1500);
    },
    onError: (error: any) => {
      setUserMsg({ type: "error", text: error.message });
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/superadmin/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete user");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin-users'] });
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUserMsg({ type: "", text: "" });
    createUserMutation.mutate({ name, email, password, role });
  };

  const handleEditClick = (u: any) => {
    setEditUserId(u.id);
    setEditName(u.name);
    setEditEmail(u.email);
    setEditRole(u.role);
    setEditPassword("");
    setIsEditDialogOpen(true);
    setUserMsg({ type: "", text: "" });
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUserMsg({ type: "", text: "" });
    updateUserMutation.mutate({ name: editName, email: editEmail, role: editRole, password: editPassword });
  };

  const handleDeleteClick = (u: any) => {
    setUserToDelete(u);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete.id);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Manage All Users</h1>
        <p className="text-gray-600">View user accounts and manage roles access across the entire platform.</p>
      </div>

      <div className="glass-panel p-6 md:p-8 rounded-3xl bg-white shadow-xl shadow-gray-100/50">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex w-full md:w-auto flex-1 gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search name or email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] outline-none text-sm"
              />
            </div>
            <div className="w-40">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full h-[42px] bg-gray-50 border-gray-200 rounded-xl focus:ring-[#EF4444]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="superadmin">Superadmin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#EF4444] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#DC2626] shadow-lg shadow-[#EF4444]/20 transition-all">
                <UserPlus size={18} /> Add User
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
              <div className="p-8">
                <DialogHeader className="mb-6 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl w-fit">
                      <UserPlus size={24} />
                    </div>
                  </div>
                  <DialogTitle className="text-2xl font-extrabold">Create New User</DialogTitle>
                </DialogHeader>

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
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] outline-none" placeholder="Enter user name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] outline-none" placeholder="Enter user email" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} minLength={6} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] outline-none" placeholder="••••••" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                    <Select value={role} onValueChange={setRole} required>
                      <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200 rounded-xl focus:ring-[#EF4444]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="superadmin">Superadmin</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <button type="submit" disabled={createUserMutation.isPending} className="w-full mt-6 flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-all disabled:opacity-70">
                    {createUserMutation.isPending ? "Creating..." : "Create User"}
                  </button>
                </form>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
              <div className="p-8">
                <DialogHeader className="mb-6 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl w-fit">
                      <Edit size={24} />
                    </div>
                  </div>
                  <DialogTitle className="text-2xl font-extrabold">Edit User</DialogTitle>
                </DialogHeader>

                {userMsg.text && (
                  <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${userMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    <div className="flex items-center gap-2">
                      {userMsg.type === 'success' && <CheckCircle2 size={16} />}
                      {userMsg.text}
                    </div>
                  </div>
                )}

                <form onSubmit={handleUpdateUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input type="text" required value={editName} onChange={e => setEditName(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <input type="email" required value={editEmail} onChange={e => setEditEmail(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                    <Select value={editRole} onValueChange={setEditRole} required>
                      <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200 rounded-xl focus:ring-[#EF4444]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="superadmin">Superadmin</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">New Password (Optional)</label>
                    <input type="password" value={editPassword} onChange={e => setEditPassword(e.target.value)} minLength={6} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] outline-none" placeholder="Leave blank to keep current" />
                  </div>
                  <button type="submit" disabled={updateUserMutation.isPending} className="w-full mt-6 flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-all disabled:opacity-70">
                    {updateUserMutation.isPending ? "Updating..." : "Update User"}
                  </button>
                </form>
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Alert Dialog */}
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className="rounded-3xl border-none shadow-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-gray-900">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  This action cannot be undone. This will permanently delete <b>{userToDelete?.name}</b>'s account
                  and all of their associated invoices from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel className="rounded-xl px-6">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={confirmDelete}
                  className="rounded-xl px-6 bg-red-600 text-white hover:bg-red-700"
                  disabled={deleteUserMutation.isPending}
                >
                  {deleteUserMutation.isPending ? "Deleting..." : "Yes, Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                <th className="pb-4 font-semibold px-4">User</th>
                <th className="pb-4 font-semibold px-4">Email</th>
                <th className="pb-4 font-semibold px-4">Role</th>
                <th className="pb-4 font-semibold px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((u: any) => (
                  <tr key={u.id} className="text-sm hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-4 font-medium text-gray-900 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm ${u.role === 'superadmin' ? 'bg-gradient-to-br from-red-400 to-red-600' : u.role === 'admin' ? 'bg-gradient-to-br from-purple-400 to-purple-600' : 'bg-gradient-to-br from-[#86EFAC] to-[#25D366]'}`}>
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      {u.name}
                    </td>
                    <td className="py-4 px-4 text-gray-600">{u.email}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${u.role === 'superadmin' ? 'bg-red-100 text-red-700' : u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreHorizontal size={16} className="text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditClick(u)} className="cursor-pointer">
                            <Edit size={14} className="mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(u)} className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
                            <Trash2 size={14} className="mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} entries
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
