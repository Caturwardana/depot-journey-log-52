
import React from 'react';
import { Gauge, Thermometer, TestTube, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const FuemanDashboard = () => {
  const qualityChecks = [
    {
      id: 'FT-002',
      unitNumber: 'B-5678-AB',
      status: 'arrived',
      flowMeter: 'FM-001',
      lastReading: '125,450 L',
      needsQualityCheck: true
    },
    {
      id: 'FT-004',
      unitNumber: 'B-3456-EF',
      status: 'unloading',
      flowMeter: 'FM-002',
      lastReading: '89,230 L',
      needsQualityCheck: false
    }
  ];

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
                <p className="text-2xl font-bold text-slate-800">8</p>
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
                <p className="text-2xl font-bold text-slate-800">15</p>
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
          <div className="space-y-4">
            {qualityChecks.map((transport) => (
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
                    {transport.needsQualityCheck && (
                      <Badge className="bg-red-100 text-red-800">
                        Quality Check Required
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Unit Number</p>
                    <p className="font-medium">{transport.unitNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Flow Meter</p>
                    <p className="font-medium">{transport.flowMeter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Last Reading</p>
                    <p className="font-medium">{transport.lastReading}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    <TestTube className="w-4 h-4 mr-1" />
                    Record Quality Data
                  </Button>
                  <Button variant="outline" size="sm">
                    <Gauge className="w-4 h-4 mr-1" />
                    Update Flow Meter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-1" />
                    Take Clarity Photo
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
