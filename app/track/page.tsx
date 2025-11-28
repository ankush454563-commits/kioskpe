'use client';

import { useState } from 'react';
import { Search, ArrowRight, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';

export default function TrackStatusPage() {
  const [requestId, setRequestId] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestId.trim()) return;

    setLoading(true);
    setError('');
    setStatus(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://kioskpe-backend.onrender.com';
      const res = await fetch(`${apiUrl}/api/services/track/${requestId}`);
      const data = await res.json();

      if (data.status === 'success') {
        setStatus(data.data);
      } else {
        setError(data.message || 'Request not found');
      }
    } catch (err) {
      setError('Failed to fetch status. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'documents-required': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'in-progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Track Your Application</h1>
          <p className="mt-4 text-lg text-gray-600">
            Enter your Reference ID to check the current status of your service request.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                placeholder="Enter Reference ID (e.g., 6564a...)"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? 'Tracking...' : 'Track Status'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
        </div>

        {status && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status.status)}`}>
                {status.status.toUpperCase()}
              </span>
            </div>
            <div className="p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Service Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-semibold">{status.serviceType.replace(/-/g, ' ').toUpperCase()}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Reference ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-mono">{status._id}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Submitted On</dt>
                  <dd className="mt-1 text-sm text-gray-900">{new Date(status.createdAt).toLocaleDateString()}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">{new Date(status.updatedAt).toLocaleDateString()}</dd>
                </div>
                
                {status.statusHistory && status.statusHistory.length > 0 && (
                  <div className="sm:col-span-2 mt-4">
                    <dt className="text-sm font-medium text-gray-500 mb-3">Status History</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="border-l-2 border-gray-200 ml-3 space-y-6">
                        {status.statusHistory.map((history: any, idx: number) => (
                          <li key={idx} className="relative pl-6">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-gray-200 border-2 border-white"></div>
                            <p className="font-medium text-gray-900">{history.status.toUpperCase()}</p>
                            <p className="text-gray-500 text-xs">{new Date(history.updatedAt).toLocaleString()}</p>
                            {history.note && <p className="text-gray-600 mt-1 text-sm bg-gray-50 p-2 rounded">{history.note}</p>}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
