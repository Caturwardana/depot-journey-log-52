
import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, FileText, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const TransportDetails = () => {
  const { id } = useParams();

  // Mock data - in real app, this would be fetched based on ID
  const transportData = {
    id: 'FT-001',
    unitNumber: 'B-1234-XY',
    driver: 'John Doe',
    route: 'Terminal A → Depot Surabaya',
    status: 'completed',
    startTime: '08:00 AM',
    endTime: '2:30 PM',
    fuelVolume: '15,000 L',
    checkpoints: [
      { type: 'departure', location: 'Terminal A', time: '08:00 AM', gps: '-6.2088, 106.8456' },
      { type: 'enroute', location: 'Highway Rest Area', time: '11:30 AM', gps: '-7.2504, 112.7688' },
      { type: 'arrival', location: 'Depot Surabaya', time: '2:30 PM', gps: '-7.2575, 112.7521' }
    ],
    documents: [
      { type: 'delivery_order', name: 'Delivery Order.pdf', uploaded: true },
      { type: 'surat_jalan', name: 'Surat Jalan.pdf', uploaded: true },
      { type: 'seal_photo', name: 'Seal Photo.jpg', uploaded: true }
    ],
    qualityData: {
      density: '0.845',
      temperature: '28°C',
      fame: '7.2%',
      flowMeterInitial: '125,450 L',
      flowMeterFinal: '140,450 L'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transport {transportData.id}</h1>
          <p className="text-slate-600">{transportData.route}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transport Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Transport Overview</CardTitle>
              <CardDescription>Basic transport information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Unit Number</p>
                  <p className="font-medium">{transportData.unitNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Driver</p>
                  <p className="font-medium">{transportData.driver}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Status</p>
                  <Badge className="bg-green-100 text-green-800">
                    {transportData.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Fuel Volume</p>
                  <p className="font-medium">{transportData.fuelVolume}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkpoints */}
          <Card>
            <CardHeader>
              <CardTitle>Journey Checkpoints</CardTitle>
              <CardDescription>GPS tracking and timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transportData.checkpoints.map((checkpoint, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border border-slate-200 rounded-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium capitalize">{checkpoint.type}</p>
                      <p className="text-sm text-slate-600">{checkpoint.location}</p>
                      <p className="text-xs text-slate-500">{checkpoint.gps}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{checkpoint.time}</p>
                      <Clock className="w-4 h-4 text-slate-400 ml-auto mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quality Data */}
          <Card>
            <CardHeader>
              <CardTitle>Fuel Quality Data</CardTitle>
              <CardDescription>Quality inspection results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-800">{transportData.qualityData.density}</p>
                  <p className="text-sm text-slate-600">Density</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-800">{transportData.qualityData.temperature}</p>
                  <p className="text-sm text-slate-600">Temperature</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-800">{transportData.qualityData.fame}</p>
                  <p className="text-sm text-slate-600">FAME</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Flow Meter Readings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Initial Reading</p>
                    <p className="font-medium">{transportData.qualityData.flowMeterInitial}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Final Reading</p>
                    <p className="font-medium">{transportData.qualityData.flowMeterFinal}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Uploaded documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transportData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      {doc.type === 'seal_photo' ? (
                        <Camera className="w-4 h-4 text-blue-500" />
                      ) : (
                        <FileText className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-sm font-medium">{doc.name}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Uploaded
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Export Report
              </Button>
              <Button variant="outline" className="w-full">
                View All Photos
              </Button>
              <Button variant="outline" className="w-full">
                Download Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
