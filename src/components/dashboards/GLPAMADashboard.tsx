
import React from 'react';
import { BarChart3, Download, FileText, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const GLPAMADashboard = () => {
  const transportRecords = [
    {
      id: 'FT-001',
      unitNumber: 'B-1234-XY',
      driver: 'John Doe',
      route: 'Terminal A → Depot Surabaya',
      status: 'completed',
      startTime: '08:00 AM',
      endTime: '2:30 PM',
      fuelVolume: '15,000 L',
      quality: { density: '0.845', temperature: '28°C', fame: '7.2%' }
    },
    {
      id: 'FT-002',
      unitNumber: 'B-5678-AB',
      driver: 'Jane Smith',
      route: 'Terminal B → Depot Jakarta',
      status: 'completed',
      startTime: '06:30 AM',
      endTime: '1:15 PM',
      fuelVolume: '12,500 L',
      quality: { density: '0.843', temperature: '29°C', fame: '7.1%' }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">GL PAMA Dashboard</h1>
          <p className="text-slate-600">Monitor and audit all transport operations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">152</p>
                <p className="text-sm text-slate-600">Total Transports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">1.8M</p>
                <p className="text-sm text-slate-600">Liters Transported</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">98.5%</p>
                <p className="text-sm text-slate-600">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">4.2</p>
                <p className="text-sm text-slate-600">Avg Hours/Trip</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transport Records</CardTitle>
          <CardDescription>
            Complete transport operations with quality data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transportRecords.map((record) => (
              <div 
                key={record.id}
                className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="font-mono">
                      {record.id}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Full Report
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Unit & Driver</p>
                    <p className="font-medium">{record.unitNumber}</p>
                    <p className="text-sm text-slate-500">{record.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Route</p>
                    <p className="font-medium text-sm">{record.route}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Duration</p>
                    <p className="font-medium">{record.startTime} - {record.endTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Volume</p>
                    <p className="font-medium">{record.fuelVolume}</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-slate-700 mb-2">Quality Data</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Density:</span>
                      <span className="ml-1 font-medium">{record.quality.density}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Temperature:</span>
                      <span className="ml-1 font-medium">{record.quality.temperature}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">FAME:</span>
                      <span className="ml-1 font-medium">{record.quality.fame}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
