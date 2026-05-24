"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Phone,
  Mail,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  UserCheck,
  UserX,
  Calendar,
  TrendingUp,
  Star,
  ArrowUpDown,
  User as UserIcon,
  Briefcase,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getAgentSession, type User } from "@/lib/storage";
import { formatDate, formatPhoneNumber, exportToCSV } from "@/lib/utils";
import { api } from "@/lib/api";

type SortField = "name" | "date" | "completion";
type SortOrder = "asc" | "desc";
type FilterStatus = "all" | "active" | "pending" | "inactive";

function UsersManagementContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const itemsPerPage = 10;
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchTerm, statusFilter, sortField, sortOrder]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const session = getAgentSession();
      if (!session) return;
      
      const response = await api.getUsers(session.agentId);
      const allUsers: any[] = Array.isArray(response) ? response : (response as any).data || [];
      setUsers(allUsers);
      
      // Check if there's a user ID in URL to view
      const userId = searchParams.get("view");
      if (userId) {
        const user = allUsers.find((u: any) => u.id === userId);
        if (user) {
          setSelectedUser(user);
          setDetailsOpen(true);
        }
      }
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error",
        description: "Failed to load users.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortUsers = () => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.fullName.toLowerCase().includes(term) ||
          u.phone.includes(term) ||
          u.email.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((u) => u.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.fullName.localeCompare(b.fullName);
          break;
        case "date":
          comparison = new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
          break;
        case "completion":
          comparison = (a.completionRate || a.completion || 0) - (b.completionRate || b.completion || 0);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      const exportData = filteredUsers.map((user) => ({
        "Full Name": user.fullName,
        "Phone": user.phone,
        "Email": user.email,
        "Country": user.country || "N/A",
        "City": user.city || "N/A",
        "Status": user.status,
        "Completion Rate": `${user.completionRate || user.completion || 0}%`,
        "Registration Date": user.registrationDate,
        "Territory": user.territory || "N/A",
        "Employment Status": user.employmentStatus || "N/A",
        "Education Level": user.educationLevel || "N/A",
        "Monthly Income": user.monthlyIncome || "N/A",
        "Interests": (user.interests || []).join(", "),
      }));
      exportToCSV(exportData, "nthoppa_users");
      toast({
        title: "Export Successful",
        description: `${exportData.length} users exported to CSV.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-[#FF6B35] text-white border-none">Active</Badge>;
      case "pending":
        return <Badge className="bg-[#F3F4F6] text-black border-none">Pending</Badge>;
      default:
        return <Badge className="bg-gray-200 text-gray-600 border-none">Inactive</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return "text-green-600";
    if (completion >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleCall = (phone: string) => {
    toast({
      title: "Initiating Call",
      description: `Calling ${phone}... (Demo)`,
    });
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
    toast({
      title: "Email Client",
      description: `Opening email client for ${email}`,
    });
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsOpen(true);
  };

  const handleEdit = (user: User) => {
    toast({
      title: "Edit User",
      description: `Editing ${user.fullName} (Demo - feature coming soon)`,
    });
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const pendingUsers = users.filter((u) => u.status === "pending").length;
  const avgCompletion = Math.round(users.reduce((sum, u) => sum + (u.completionRate || u.completion || 0), 0) / totalUsers) || 0;

  if (isLoading) {
    return (
      <DashboardLayout type="agent">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">User Management</h1>
          <p className="text-gray-600">Manage and monitor all registered customers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold text-black">{totalUsers}</p>
                </div>
                <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#FF6B35]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Users</p>
                  <p className="text-2xl font-bold text-black">{activeUsers}</p>
                </div>
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold text-black">{pendingUsers}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg Completion</p>
                  <p className="text-2xl font-bold text-black">{avgCompletion}%</p>
                </div>
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as FilterStatus)}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={handleExportCSV}
                  disabled={isExporting || filteredUsers.length === 0}
                  className="border-gray-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? "Exporting..." : "Export CSV"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border-gray-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      <button
                        onClick={() => toggleSort("name")}
                        className="flex items-center gap-1 hover:text-[#FF6B35]"
                      >
                        Customer
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      <button
                        onClick={() => toggleSort("date")}
                        className="flex items-center gap-1 hover:text-[#FF6B35]"
                      >
                        Registration Date
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      <button
                        onClick={() => toggleSort("completion")}
                        className="flex items-center gap-1 hover:text-[#FF6B35]"
                      >
                        Completion
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Territory</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-gray-500">
                        <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>No users found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 gradient-orange-black">
                              <AvatarFallback className="bg-transparent text-white text-xs">
                                {getInitials(user.fullName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-black">{user.fullName}</p>
                              <p className="text-xs text-gray-500">{user.city || "N/A"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">{formatPhoneNumber(user.phone)}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                        <td className="py-3 px-4 text-sm text-gray-500">{formatDate(user.registrationDate)}</td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className={getCompletionColor(user.completionRate || user.completion || 0)}>
                                {user.completionRate || user.completion || 0}%
                              </span>
                            </div>
                            <Progress value={user.completionRate || user.completion || 0} className="h-1" />
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">{user.territory || "N/A"}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleCall(user.phone)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#FF6B35] transition-colors"
                              title="Call"
                            >
                              <Phone className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEmail(user.email)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#FF6B35] transition-colors"
                              title="Email"
                            >
                              <Mail className="h-4 w-4" />
                            </button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                                  <MoreVertical className="h-4 w-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(user)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-200"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="px-3 py-1 text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-200"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* User Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="text-black flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#FF6B35]" />
                  User Details
                </DialogTitle>
                <DialogDescription>
                  Complete profile information for {selectedUser.fullName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* User Header */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="h-16 w-16 gradient-orange-black">
                    <AvatarFallback className="bg-transparent text-white text-xl">
                      {getInitials(selectedUser.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-black">{selectedUser.fullName}</h3>
                    <p className="text-gray-500">{selectedUser.email}</p>
                    <div className="flex gap-2 mt-1">
                      {getStatusBadge(selectedUser.status)}
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-[#FF6B35]" />
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <p className="font-medium text-black">{formatPhoneNumber(selectedUser.phone)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Gender:</span>
                      <p className="font-medium text-black">{selectedUser.gender || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Date of Birth:</span>
                      <p className="font-medium text-black">{selectedUser.dateOfBirth ? formatDate(selectedUser.dateOfBirth) : "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Country:</span>
                      <p className="font-medium text-black">{selectedUser.country || "N/A"}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Address:</span>
                      <p className="font-medium text-black">
                        {selectedUser.address || "N/A"}, {selectedUser.city || "N/A"} {selectedUser.postalCode || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-[#FF6B35]" />
                    Professional Information
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-gray-500">Employment:</span>
                      <p className="font-medium text-black">{selectedUser.employmentStatus || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Education:</span>
                      <p className="font-medium text-black">{selectedUser.educationLevel || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Industry:</span>
                      <p className="font-medium text-black">{selectedUser.industry || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Monthly Income:</span>
                      <p className="font-medium text-black">{selectedUser.monthlyIncome || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Interests */}
                {selectedUser.interests && selectedUser.interests.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4 text-[#FF6B35]" />
                      Areas of Interest
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.interests.map((interest: string) => (
                        <Badge key={interest} className="bg-[#FF6B35] text-white">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Registration Info */}
                <div>
                  <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#FF6B35]" />
                    Registration Information
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-gray-500">Registration Date:</span>
                      <p className="font-medium text-black">{formatDate(selectedUser.registrationDate)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Territory:</span>
                      <p className="font-medium text-black">{selectedUser.territory || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Completion Rate:</span>
                      <div className="flex items-center gap-2">
                        <Progress value={selectedUser.completionRate || selectedUser.completion || 0} className="h-2 flex-1" />
                        <span className="font-medium text-black">{selectedUser.completionRate || selectedUser.completion || 0}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Close
                </Button>
                <Button
                  className="bg-[#FF6B35] text-white hover:bg-black"
                  onClick={() => {
                    setDetailsOpen(false);
                    handleEdit(selectedUser);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

export default function UsersManagementPage() {
  return (
    <Suspense fallback={
      <DashboardLayout type="agent">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        </div>
      </DashboardLayout>
    }>
      <UsersManagementContent />
    </Suspense>
  );
}