
import React from 'react';
import { Users, Settings, BarChart3, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const AdminDashboard = () => {
  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Transport FT-005 has exceeded expected delivery time',
      timestamp: '10 minutes ago'
    },
    {
      id: 2,
      type: 'info',
      message: 'New user registration: Mike Johnson (Driver)',
      timestamp: '25 minutes ago'
    }
  ];

  const recentUsers = [
    { id: 1, name: 'John Driver', role: 'driver', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Supervisor', role: 'supervisor', status: 'active', lastLogin: '30 minutes ago' },
    { id: 3, name: 'Mike Fuelman', role: 'fuelman', status: 'inactive', lastLogin: '2 days ago' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-600">System administration and user management</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Users className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">24</p>
                <p className="text-sm text-slate-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">156</p>
                <p className="text-sm text-slate-600">Total Transports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">3</p>
                <p className="text-sm text-slate-600">System Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-slate-800">99.2%</p>
                <p className="text-sm text-slate-600">System Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>
              Recent system notifications and warnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg"
                >
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    alert.type === 'warning' ? 'text-orange-500' : 'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Recent user activity and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div 
                  key={user.id}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-800">{user.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      <Badge className={`text-xs ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">{user.lastLogin}</p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
