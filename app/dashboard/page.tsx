'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  LogOut, 
  Plus,
  User,
  XCircle
} from 'lucide-react';

interface ServiceRequest {
  _id: string;
  serviceType: string;
  status: string;
  createdAt: string;
  businessName?: string;
  description?: string;
  documents?: {
    name: string;
    url: string;
    uploadedAt: string;
  }[];
}

interface UserData {
  name: string;
  email: string;
  phone: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    actionRequired: 0
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchRequests(token);
  }, [router]);

  const fetchRequests = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://kioskpe-backend.onrender.com';
      const res = await fetch(`${apiUrl}/api/services/my-requests`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.status === 'success') {
        setRequests(data.data);
        calculateStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: ServiceRequest[]) => {
    const newStats = {
      total: data.length,
      pending: data.filter(r => ['pending', 'under-review'].includes(r.status)).length,
      completed: data.filter(r => r.status === 'completed').length,
      actionRequired: data.filter(r => r.status === 'documents-required').length
    };
    setStats(newStats);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, requestId: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('document', file);
    
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://kioskpe-backend.onrender.com';
      
      const res = await fetch(`${apiUrl}/api/services/request/${requestId}/document`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await res.json();
      if (data.status === 'success') {
        setSelectedRequest(data.data);
        setRequests(requests.map(r => r._id === requestId ? data.data : r));
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'documents-required': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Mobile hidden, Desktop visible */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-2xl font-bold text-primary">LetsLegal Dashboard</h1>
            </div>
            <nav className="mt-8 flex-1 space-y-1 px-2">
              <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary">
                <LayoutDashboard className="mr-3 h-6 w-6" />
                Dashboard
              </a>
              <Link href="/business-legal" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Plus className="mr-3 h-6 w-6" />
                New Request
              </Link>
              <Link href="/profile" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <User className="mr-3 h-6 w-6" />
                Profile
              </Link>
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <button onClick={handleLogout} className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <LogOut className="inline-block h-5 w-5 text-gray-500 group-hover:text-gray-700" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Logout</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.name}</h1>
            </div>
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="truncate text-sm font-medium text-gray-500">Total Requests</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{stats.total}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Clock className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="truncate text-sm font-medium text-gray-500">Pending</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{stats.pending}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="truncate text-sm font-medium text-gray-500">Completed</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{stats.completed}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-red-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="truncate text-sm font-medium text-gray-500">Action Required</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{stats.actionRequired}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Requests Table */}
              <div className="mt-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Requests</h2>
                    <p className="mt-2 text-sm text-gray-700">
                      A list of all your service requests including their status and creation date.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link
                      href="/business-legal"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
                    >
                      New Request
                    </Link>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Service Type
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Business Name
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Status
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Date
                              </th>
                              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">View</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {requests.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="py-8 text-center text-sm text-gray-500">
                                  No service requests found. Start by creating one!
                                </td>
                              </tr>
                            ) : (
                              requests.map((request) => (
                                <tr key={request._id}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {request.serviceType.replace(/-/g, ' ').toUpperCase()}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {request.businessName || 'N/A'}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(request.status)}`}>
                                      {request.status}
                                    </span>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {new Date(request.createdAt).toLocaleDateString()}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button
                                      onClick={() => {
                                        setSelectedRequest(request);
                                        setIsModalOpen(true);
                                      }}
                                      className="text-primary hover:text-primary/80"
                                    >
                                      View<span className="sr-only">, {request._id}</span>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Request Details Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Request Details</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="font-medium">{selectedRequest.serviceType.replace(/-/g, ' ').toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Business Name</p>
                  <p className="font-medium">{selectedRequest.businessName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(selectedRequest.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
                  {selectedRequest.description || 'No description provided.'}
                </div>
              </div>

              {/* Documents */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Documents</p>
                  <label className="cursor-pointer bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary/90 flex items-center">
                    {uploading ? 'Uploading...' : 'Upload Document'}
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, selectedRequest._id)}
                      disabled={uploading}
                    />
                  </label>
                </div>
                
                {selectedRequest.documents && selectedRequest.documents.length > 0 ? (
                  <ul className="border rounded-md divide-y">
                    {selectedRequest.documents.map((doc, idx) => (
                      <li key={idx} className="p-3 flex justify-between items-center hover:bg-gray-50">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-700">{doc.name}</span>
                        </div>
                        <a 
                          href={doc.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary text-sm hover:underline"
                        >
                          View
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">No documents uploaded yet.</p>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
