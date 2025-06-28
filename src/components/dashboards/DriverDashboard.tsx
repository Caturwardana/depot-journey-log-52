
import React, { useState } from 'react';
import { Plus, Truck, MapPin, Clock, Camera, FileText, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateTransportModal } from '../transport/CreateTransportModal';
import { PhotoUpload } from '../common/PhotoUpload';
import { useTransports } from '@/hooks/useApiData';

export const DriverDashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { 
    transports, 
    isLoading, 
    updateTransportStatus, 
    deleteTransport 
  } = useTransports();

  const stats = {
    active: transports.filter((t: any) => 
      ['loading', 'enroute', 'arrived'].includes(t.status)
    ).length,
    completed: transports.filter((t: any) => 
      t.status === 'completed'
    ).length,
    totalKm: 3200, // This would come from actual calculation
    documents: 12 // This would come from documents API
  };

  const handleUpdateStatus = async (transportId: string, newStatus: string) => {
    try {
      await updateTransportStatus({ id: transportId, status: newStatus });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDeleteTransport = async (transportId: string) => {
    if (confirm('Are you sure you want to delete this transport?')) {
      try {
        await deleteTransport(transportId);
      } catch (error) {
        console.error('Failed to delete transport:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'loading': return 'bg-yellow-100 text-yellow-800';
      case 'enroute': return 'bg-blue-100 text-blue-800';
      case 'arrived': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'loading': return 'Loading';
      case 'enroute': return 'En Route';
      case 'arrived': return 'Arrived';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Driver Dashboard</h1>
          <p className="text-slate-600">Manage your transport operations</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Transport
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.active}</p>
                <p className="text-sm text-slate-600">Active Transports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.completed}</p>
                <p className="text-sm text-slate-600">Completed Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.totalKm}</p>
                <p className="text-sm text-slate-600">KM This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.documents}</p>
                <p className="text-sm text-slate-600">Documents Uploaded</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Transports */}
      <Card>
        <CardHeader>
          <CardTitle>Active Transports</CardTitle>
          <CardDescription>
            Your current transport operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transports.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No active transports found</p>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="mt-4 bg-orange-500 hover:bg-orange-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Transport
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {transports.map((transport: any) => (
                <div 
                  key={transport.id}
                  className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="font-mono">
                        {transport.id}
                      </Badge>
                      <Badge className={getStatusColor(transport.status)}>
                        {getStatusText(transport.status)}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTransport(transport.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Unit Number</p>
                      <p className="font-medium">{transport.unitNumber || transport.unit_number || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Destination</p>
                      <p className="font-medium">{transport.destination || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Driver</p>
                      <p className="font-medium">{transport.driverName || transport.driver_name || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <div className="flex space-x-2">
                      <PhotoUpload
                        transportId={transport.id}
                        type="seal"
                        className="flex-1"
                      />
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUpdateStatus(transport.id, 'enroute')}
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        Update Status
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600">
                      Started: {transport.startTime || transport.created_at ? 
                        new Date(transport.startTime || transport.created_at).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CreateTransportModal 
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
};
