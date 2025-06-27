
import React, { useState } from 'react';
import { Plus, Truck, MapPin, Clock, Camera, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateTransportModal } from '../transport/CreateTransportModal';

export const DriverDashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const activeTransports = [
    {
      id: 'FT-001',
      unitNumber: 'B-1234-XY',
      destination: 'Depot Surabaya',
      status: 'loading',
      startTime: '08:00 AM',
      estimatedArrival: '2:00 PM'
    },
    {
      id: 'FT-002',
      unitNumber: 'B-5678-AB',
      destination: 'Depot Jakarta',
      status: 'enroute',
      startTime: '06:30 AM',
      estimatedArrival: '12:30 PM'
    }
  ];

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
                <p className="text-2xl font-bold text-slate-800">2</p>
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
                <p className="text-2xl font-bold text-slate-800">15</p>
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
                <p className="text-2xl font-bold text-slate-800">3.2k</p>
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
                <p className="text-2xl font-bold text-slate-800">12</p>
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
          <div className="space-y-4">
            {activeTransports.map((transport) => (
              <div 
                key={transport.id}
                className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer"
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
                    <p className="font-medium">{transport.unitNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Destination</p>
                    <p className="font-medium">{transport.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Started</p>
                    <p className="font-medium">{transport.startTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-1" />
                      Upload Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      Update Location
                    </Button>
                  </div>
                  <p className="text-sm text-slate-600">
                    ETA: {transport.estimatedArrival}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CreateTransportModal 
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
};
