
import React, { useEffect, useState } from 'react';
import { MapPin, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useTransports } from '@/hooks/useApiData';
import ApiService from '../../services/api';

interface CreateTransportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTransportCreated?: () => void;
}

export const CreateTransportModal: React.FC<CreateTransportModalProps> = ({ 
  open, 
  onOpenChange, 
  onTransportCreated 
}) => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    unit_number: '',
    destination: '',
    notes: '',
    fuel_type: '',
    volume: '',
  });
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { createTransport } = useTransports();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    console.log('user_id from localStorage:', userId);

    if (userId) {
      ApiService.getUserById(userId).then((response) => {
        console.log('Fetched user:', response);
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          console.warn('Failed to fetch user or user not found');
        }
      }).catch((err) => {
        console.error('Error fetching user:', err);
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.id) {
      toast({
        title: "Error",
        description: "Unable to get driver ID. Please refresh or re-login.",
        variant: "destructive",
      });
      return;
    }

    // Validation
    if (!formData.unit_number || !formData.destination || !formData.fuel_type || !formData.volume) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create payload that matches backend schema exactly
      const transportData = {
        unit_number: formData.unit_number.trim(),
        driver_id: parseInt(user.id),
        destination: formData.destination.trim(),
        fuel_type: formData.fuel_type,
        volume: parseFloat(formData.volume),
        status: 'pending',
        notes: formData.notes?.trim() || null,
        latitude: location?.lat || null,
        longitude: location?.lng || null
      };

      console.log("Submitting transport data:", transportData);

      await createTransport(transportData);
      
      // Reset form and close modal
      onOpenChange(false);
      setFormData({ 
        unit_number: '', 
        destination: '', 
        notes: '', 
        fuel_type: '', 
        volume: '' 
      });
      setLocation(null);
      
      if (onTransportCreated) {
        onTransportCreated();
      }

    } catch (error: any) {
      console.error('Create transport error:', error);
      
      // Enhanced error handling
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          "Failed to create transport. Please try again.";
      
      toast({
        title: "Error Creating Transport",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(newLocation);
          toast({
            title: "Location Captured",
            description: `Lat: ${newLocation.lat.toFixed(6)}, Lng: ${newLocation.lng.toFixed(6)}`,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Location Error",
            description: "Unable to capture location. Please enable GPS and try again.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "File size must be less than 5MB.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "File Selected",
        description: `Selected file: ${file.name}`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Transport</DialogTitle>
          <DialogDescription>
            Initialize a new fuel transport operation
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="unit_number">Unit Number *</Label>
            <Input
              id="unit_number"
              placeholder="e.g., B-1234-XY"
              value={formData.unit_number}
              onChange={(e) => handleInputChange('unit_number', e.target.value)}
              required
            />
          </div>
                    
          <div className="space-y-2">
            <Label htmlFor="fuel_type">Fuel Type *</Label>
            <select
              id="fuel_type"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.fuel_type}
              onChange={(e) => handleInputChange('fuel_type', e.target.value)}
              required
            >
              <option value="">-- Select Fuel Type --</option>
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="kerosene">Kerosene</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination *</Label>
            <Input
              id="destination"
              placeholder="e.g., Depot Surabaya"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="volume">Volume (Liter) *</Label>
            <Input
              id="volume"
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g., 5000"
              value={formData.volume}
              onChange={(e) => handleInputChange('volume', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline" onClick={captureLocation}>
              <MapPin className="w-4 h-4 mr-2" />
              {location ? '✓ Location Captured' : 'GPS Location'}
            </Button>
            <label className="flex items-center justify-center p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Transport'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
