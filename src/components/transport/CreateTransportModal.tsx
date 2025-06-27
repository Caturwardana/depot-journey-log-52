
import React, { useState } from 'react';
import { Camera, Upload, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface CreateTransportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateTransportModal: React.FC<CreateTransportModalProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    unitNumber: '',
    driverName: '',
    destination: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Transport Created",
      description: `Transport ${formData.unitNumber} has been created successfully.`,
    });

    setLoading(false);
    onOpenChange(false);
    setFormData({ unitNumber: '', driverName: '', destination: '', notes: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location Captured",
            description: `Lat: ${position.coords.latitude.toFixed(6)}, Lng: ${position.coords.longitude.toFixed(6)}`,
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
            <Label htmlFor="driverName">Driver Name</Label>
            <Input
              id="driverName"
              placeholder="Enter driver name"
              value={formData.driverName}
              onChange={(e) => handleInputChange('driverName', e.target.value)}
              required
            />
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
          
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline" onClick={captureLocation}>
              <MapPin className="w-4 h-4 mr-2" />
              GPS Location
            </Button>
            <Button type="button" variant="outline">
              <Camera className="w-4 h-4 mr-2" />
              Take Photo
            </Button>
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
