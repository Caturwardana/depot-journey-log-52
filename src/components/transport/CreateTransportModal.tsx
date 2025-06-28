import React, { useEffect, useState } from 'react';
import { Camera, Upload, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
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
    unitNumber: '',
    destination: '',
    notes: '',
    fuelType: '', // Add fuelType
    volume: '',
  });
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

useEffect(() => {
  const userId = localStorage.getItem('user_id');
  console.log('user_id from localStorage:', userId); // Debug

  if (userId) {
    ApiService.getUserById(userId).then((response) => {
      console.log('Fetched user:', response); // Debug

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


const driverId = user?.id ?? ''; // atau || '' juga boleh


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent submission if user or user.id is not loaded
    if (!user || !user.id) {
      toast({
        title: "User Not Loaded",
        description: "Unable to get driver ID. Please refresh or re-login.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
        const transportData = {
          unit_number: formData.unitNumber,
          driver_id: user.id,
          destination: formData.destination,
          notes: formData.notes,
          fuel_type: formData.fuelType,
          volume: formData.volume,
          status: 'pending', // Set status to 'pending' as required
          startTime: new Date().toISOString(),
          location: location ? `${location.lat},${location.lng}` : null
        };

      console.log("Submitting transportData:", transportData);

      const response = await ApiService.createTransport(transportData);
      
      if (response.success) {
        toast({
          title: "Transport Created",
          description: `Transport ${formData.unitNumber} has been created successfully.`,
        });

        onOpenChange(false);
        setFormData({ unitNumber: '', destination: '', notes: '', fuelType: '', volume: '' });
        setLocation(null);
        
        if (onTransportCreated) {
          onTransportCreated();
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create transport. Please try again.",
        variant: "destructive",
      });
      console.error('Create transport error:', error);
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
          toast({
            title: "Location Error",
            description: "Unable to capture location. Please enable GPS.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Handle the uploaded file here
    if (file) {
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
            <Label htmlFor="unitNumber">Unit Number</Label>
            <Input
              id="unitNumber"
              placeholder="e.g., B-1234-XY"
              value={formData.unitNumber}
              onChange={(e) => handleInputChange('unitNumber', e.target.value)}
              required
            />
          </div>
                    
          <div className="space-y-2">
            <Label htmlFor="fuelType">Fuel Type</Label>
            <select
              id="fuelType"
              className="form-select w-full border rounded px-3 py-2"
              value={formData.fuelType}
              onChange={(e) => handleInputChange('fuelType', e.target.value)}
              required
            >
              <option value="">-- Select Fuel Type --</option>
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="kerosene">Kerosene</option>
            </select>
          </div>


          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="e.g., Depot Surabaya"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
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
          
          <div className="space-y-2">
            <Label htmlFor="volume">Volume (Liter)</Label>
            <Input
              id="volume"
              type="number"
              min="0"
              placeholder="e.g., 5000"
              value={formData.volume}
              onChange={(e) => handleInputChange('volume', e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline" onClick={captureLocation}>
              <MapPin className="w-4 h-4 mr-2" />
              {location ? 'Location Captured' : 'GPS Location'}
            </Button>
            <label style={{ cursor: "pointer" }} className="flex items-center justify-center p-2 border rounded-md">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
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
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              {loading ? 'Creating...' : 'Create Transport'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
