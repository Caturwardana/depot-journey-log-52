
import React, { useState } from 'react';
import { Gauge, Thermometer, TestTube, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PhotoUpload } from '../common/PhotoUpload';
import { useTransports, useFuelQuality, useFlowMeters } from '@/hooks/useApiData';
import { FuelQualityModal } from '../quality/FuelQualityModal';

export const FuemanDashboard = () => {
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<any>(null);
  
  const { transports, isLoading } = useTransports();
  const { fuelQuality } = useFuelQuality();
  const { flowMeters, updateFlowMeter } = useFlowMeters();

  // Filter transports that have arrived and need quality checks
  const qualityChecks = transports.filter((transport: any) => 
    ['arrived', 'unloading'].includes(transport.status)
  );

  const handleRecordQualityData = (transport: any) => {
    setSelectedTransport(transport);
    setShowQualityModal(true);
  };

  const handleUpdateFlowMeter = async (transportId: string) => {
    const newReading = prompt('Enter new flow meter reading (in liters):');
    if (newReading && !isNaN(Number(newReading))) {
      try {
        await updateFlowMeter({ 
          id: transportId, 
          data: { 
            reading: Number(newReading),
            timestamp: new Date().toISOString()
          }
        });
      } catch (error) {
        console.error('Failed to update flow meter:', error);
      }
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
        <h1 className="text-2xl font-bold text-slate-800">Fuelman Dashboard</h1>
        <p className="text-slate-600">Monitor fuel quality and flow meter readings</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Gauge className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">{flowMeters.length}</p>
                <p className="text-sm text-slate-600">Active Flow Meters</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TestTube className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">{fuelQuality.length}</p>
                <p className="text-sm text-slate-600">Quality Tests Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">28°C</p>
                <p className="text-sm text-slate-600">Avg Temperature</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Camera className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">32</p>
                <p className="text-sm text-slate-600">Quality Photos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Arrived Transports */}
      <Card>
        <CardHeader>
          <CardTitle>Quality Checks Required</CardTitle>
          <CardDescription>
            Transports that need fuel quality inspection
          </CardDescription>
        </CardHeader>
        <CardContent>
          {qualityChecks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No transports requiring quality checks</p>
            </div>
          ) : (
            <div className="space-y-4">
              {qualityChecks.map((transport: any) => (
                <div 
                  key={transport.id}
                  className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="font-mono">
                        {transport.id}
                      </Badge>
                      <Badge className={transport.status === 'arrived' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {transport.status === 'arrived' ? 'Arrived' : 'Unloading'}
                      </Badge>
                      <Badge className="bg-red-100 text-red-800">
                        Quality Check Required
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-600">Unit Number</p>
                      <p className="font-medium">{transport.unitNumber || transport.unit_number || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Volume</p>
                      <p className="font-medium">{transport.volume || '15,000 L'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Fuel Type</p>
                      <p className="font-medium">{transport.fuelType || transport.fuel_type || 'Biodiesel'}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleRecordQualityData(transport)}
                    >
                      <TestTube className="w-4 h-4 mr-1" />
                      Record Quality Data
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUpdateFlowMeter(transport.id)}
                    >
                      <Gauge className="w-4 h-4 mr-1" />
                      Update Flow Meter
                    </Button>
                    
                    <PhotoUpload
                      transportId={transport.id}
                      type="quality"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showQualityModal && selectedTransport && (
        <FuelQualityModal
          open={showQualityModal}
          onOpenChange={setShowQualityModal}
          transport={selectedTransport}
        />
      )}
    </div>
  );
};
