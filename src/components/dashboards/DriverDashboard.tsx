
import React, { useState, useEffect } from 'react';
import { Plus, Truck, MapPin, Clock, Camera, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateTransportModal } from '../transport/CreateTransportModal';
import { toast } from '@/hooks/use-toast';
import ApiService from '../../services/api';

export const DriverDashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    totalKm: 0,
    documents: 0
  });

  const fetchTransports = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getTransports();
      
      if (response.success && response.data) {
        setTransports(response.data);
        
        // Calculate stats
        const activeCount = response.data.filter((t: any) => 
          ['loading', 'enroute', 'arrived'].includes(t.status)
        ).length;
        
        const completedCount = response.data.filter((t: any) => 
          t.status === 'completed'
        ).length;

        setStats({
          active: activeCount,
          completed: completedCount,
          totalKm: 3200, // This would come from actual calculation
          documents: 12 // This would come from documents API
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch transports",
        variant: "destructive",
      });
      console.error('Fetch transports error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleTransportCreated = () => {
    fetchTransports(); // Refresh data after creating new transport
  };

  const handleUpdateStatus = async (transportId: string, newStatus: string) => {
    try {
      const response = await ApiService.updateTransportStatus(transportId, newStatus);
      
      if (response.success) {
        toast({
          title: "Status Updated",
          description: `Transport status updated to ${newStatus}`,
        });
        fetchTransports(); // Refresh data
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update transport status",
        variant: "destructive",
      });
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

  if (loading) {
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
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Unit Number</p>
                      <p className="font-medium">{transport.unitNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Destination</p>
                      <p className="font-medium">{transport.destination || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Driver</p>
                      <p className="font-medium">{transport.driverName || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-1" />
                        Upload Photo
                      </Button>
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
                      Started: {transport.startTime ? new Date(transport.startTime).toLocaleString() : 'N/A'}
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
        onTransportCreated={handleTransportCreated}
      />
    </div>
  );
};
