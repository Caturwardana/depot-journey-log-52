
import React, { useState, useEffect } from 'react';
import { User, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUsers } from '@/hooks/useApiData';

interface UserManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: any;
}

export const UserManagementModal: React.FC<UserManagementModalProps> = ({ 
  open, 
  onOpenChange, 
  user 
}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullname: '',
    role: 'driver'
  });
  const [loading, setLoading] = useState(false);
  const { createUser, updateUser } = useUsers();

  const isEditing = !!user;

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        password: '', // Don't pre-fill password for security
        fullname: user.fullname || '',
        role: user.role || 'driver'
      });
    } else {
      setFormData({
        username: '',
        password: '',
        fullname: '',
        role: 'driver'
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const updateData = {
          username: formData.username,
          fullname: formData.fullname,
          role: formData.role
        };
        // Only include password if it's provided
        if (formData.password) {
          (updateData as any).password = formData.password;
        }
        await updateUser({ id: user.id, data: updateData });
      } else {
        await createUser(formData);
      }
      
      onOpenChange(false);
      setFormData({
        username: '',
        password: '',
        fullname: '',
        role: 'driver'
      });
    } catch (error) {
      console.error('Failed to save user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update user information' : 'Create a new user account'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              placeholder="Enter full name"
              value={formData.fullname}
              onChange={(e) => handleInputChange('fullname', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">
              Password {isEditing && '(leave blank to keep current)'}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="fuelman">Fuelman</SelectItem>
                <SelectItem value="glpama">GL PAMA</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              {loading ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update User' : 'Create User'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
