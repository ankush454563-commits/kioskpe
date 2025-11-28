'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  MoreVertical
} from 'lucide-react';

interface ServiceRequest {
  _id: string;
  serviceType: string;
  status: string;
  createdAt: string;
  businessName?: string;
  userId: {
    name: string;
    email: string;
  };
  priority?: string;
}

interface DashboardStats {
  users: number;
  serviceRequests: number;
  inquiries: number;
  statusBreakdown: Record<string, number>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== 'admin') {
      router.push('/dashboard'); // Redirect non-admins to user dashboard
      return;
    }

    fetchDashboardData(token);
  };

  const fetchDashboardData = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://kioskpe-backend.onrender.com';
      
      // Fetch stats
      const statsRes = await fetch(`${apiUrl}/api/admin/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsRes.json();
      
      if (statsData.status === 'success') {
        setStats(statsData.data.stats);
      }

      // Fetch all requests
      const requestsRes = await fetch(`${apiUrl}/api/services/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const requestsData = await requestsRes.json();

      if (requestsData.status === 'success') {
        setRequests(requestsData.data);
      }
    } catch (error) {
      console.error('Admin data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://kioskpe-backend.onrender.com';
      
      const res = await fetch(`${apiUrl}/api/services/request/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();
      if (data.status === 'success') {
        // Refresh data
        fetchDashboardData(token!);
      }
    } catch (error) {
      console.error('Status update error:', error);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      req.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.businessName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'documents-required': return 'bg-orange-100 text-orange-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary border-r-4 border-primary' : ''}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${activeTab === 'requests' ? 'bg-primary/10 text-primary border-r-4 border-primary' : ''}`}
          >
            <FileText className="w-5 h-5 mr-3" />
            Service Requests
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${activeTab === 'users' ? 'bg-primary/10 text-primary border-r-4 border-primary' : ''}`}
          >
            <Users className="w-5 h-5 mr-3" />
            Users
          </button>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button 
            onClick={() => {
              localStorage.clear();
              router.push('/login');
            }}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Requests</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stats.serviceRequests}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stats.users}</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Pending Actions</p>
                    <h3 className="text-3xl font-bold text-gray-800">
                      {(stats.statusBreakdown?.pending || 0) + (stats.statusBreakdown?.['under-review'] || 0)}
                    </h3>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Requests</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.slice(0, 5).map((req) => (
                      <tr key={req._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {req.serviceType.replace(/-/g, ' ').toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {req.userId?.name || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(req.status)}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Service Requests</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((req) => (
                    <tr key={req._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{req.serviceType.replace(/-/g, ' ').toUpperCase()}</div>
                        <div className="text-sm text-gray-500">{req.businessName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{req.userId?.name}</div>
                        <div className="text-sm text-gray-500">{req.userId?.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusUpdate(req._id, e.target.value)}
                          className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        >
                          <option value="pending">Pending</option>
                          <option value="under-review">Under Review</option>
                          <option value="documents-required">Docs Required</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
