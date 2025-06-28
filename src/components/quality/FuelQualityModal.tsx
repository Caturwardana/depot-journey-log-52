
import React, { useState } from 'react';
import { TestTube, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useFuelQuality } from '@/hooks/useApiData';

interface FuelQualityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transport: any;
}

export const FuelQualityModal: React.FC<FuelQualityModalProps> = ({ 
  open, 
  onOpenChange, 
  transport 
}) => {
  const [formData, setFormData] = useState({
    density: '',
    temperature: '',
    fame: '',
    viscosity: '',
    flashPoint: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const { createFuelQuality } = useFuelQuality();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const qualityData = {
        ...formData,
        transportId: transport.id,
        timestamp: new Date().toISOString(),
        density: parseFloat(formData.density) || null,
        temperature: parseFloat(formData.temperature) || null,
        fame: parseFloat(formData.fame) || null,
        viscosity: parseFloat(formData.viscosity) || null,
        flashPoint: parseFloat(formData.flashPoint) || null,
      };

      await createFuelQuality(qualityData);
      onOpenChange(false);
      setFormData({
        density: '',
        temperature: '',
        fame: '',
        viscosity: '',
        flashPoint: '',
        notes: ''
      });
    } catch (error) {
      console.error('Failed to record quality data:', error);
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
          <DialogTitle>Record Fuel Quality Data</DialogTitle>
          <DialogDescription>
            Transport {transport.id} - {transport.unitNumber || transport.unit_number}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="density">Density (g/cm³)</Label>
              <Input
                id="density"
                type="number"
                step="0.001"
                placeholder="0.845"
                value={formData.density}
                onChange={(e) => handleInputChange('density', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                placeholder="28.0"
                value={formData.temperature}
                onChange={(e) => handleInputChange('temperature', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fame">FAME (%)</Label>
              <Input
                id="fame"
                type="number"
                step="0.1"
                placeholder="7.2"
                value={formData.fame}
                onChange={(e) => handleInputChange('fame', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="viscosity">Viscosity (mm²/s)</Label>
              <Input
                id="viscosity"
                type="number"
                step="0.1"
                placeholder="4.5"
                value={formData.viscosity}
                onChange={(e) => handleInputChange('viscosity', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="flashPoint">Flash Point (°C)</Label>
            <Input
              id="flashPoint"
              type="number"
              step="1"
              placeholder="65"
              value={formData.flashPoint}
              onChange={(e) => handleInputChange('flashPoint', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional quality observations..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
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
                  Save Quality Data
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
