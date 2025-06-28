
import React, { useState } from 'react';
import { Clock, CheckCircle, Camera, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PhotoUpload } from '../common/PhotoUpload';
import { FileUpload } from '../common/FileUpload';
import { useTransports } from '@/hooks/useApiData';

export const SupervisorDashboard = () => {
  const { transports, updateTransportStatus, isLoading } = useTransports();
  
  // Filter transports that need verification
  const pendingVerifications = transports.filter((transport: any) => 
    ['loading', 'awaiting_verification'].includes(transport.status)
  );

  const handleVerifyLoading = async (transportId: string) => {
    try {
      await updateTransportStatus({ id: transportId, status: 'verified' });
    } catch (error) {
      console.error('Failed to verify loading:', error);
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Supervisor Dashboard</h1>
        <p className="text-slate-600">Verify loading operations and documentation</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">{pendingVerifications.length}</p>
                <p className="text-sm text-slate-600">Pending Verification</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {transports.filter((t: any) => t.status === 'verified').length}
                </p>
                <p className="text-sm text-slate-600">Verified Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Camera className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">45</p>
                <p className="text-sm text-slate-600">Seal Photos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">78</p>
                <p className="text-sm text-slate-600">Documents Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Verifications */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Verifications</CardTitle>
          <CardDescription>
            Transports requiring supervisor verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingVerifications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No pending verifications</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingVerifications.map((transport: any) => (
                <div 
                  key={transport.id}
                  className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="font-mono">
                        {transport.id}
                      </Badge>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {transport.status === 'awaiting_verification' ? 'Awaiting Verification' : 'Loading Complete'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-600">Unit Number</p>
                      <p className="font-medium">{transport.unitNumber || transport.unit_number || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Driver</p>
                      <p className="font-medium">{transport.driverName || transport.driver_name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Loading Time</p>
                      <p className="font-medium">
                        {transport.created_at ? new Date(transport.created_at).toLocaleTimeString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Destination</p>
                      <p className="font-medium">{transport.destination || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleVerifyLoading(transport.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verify Loading
                    </Button>
                    
                    <PhotoUpload
                      transportId={transport.id}
                      type="seal"
                    />
                    
                    <FileUpload />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
