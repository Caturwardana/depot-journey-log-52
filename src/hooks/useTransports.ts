
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ApiService from '../services/api';
import { toast } from '@/hooks/use-toast';

export const useTransports = () => {
  return useQuery({
    queryKey: ['transports'],
    queryFn: async () => {
      const response = await ApiService.getTransports();
      return response.data || [];
    },
  });
};

export const useTransport = (id: string) => {
  return useQuery({
    queryKey: ['transport', id],
    queryFn: async () => {
      const response = await ApiService.getTransport(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateTransport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (transportData: any) => ApiService.createTransport(transportData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transports'] });
      toast({
        title: "Success",
        description: "Transport created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create transport",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateTransportStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      ApiService.updateTransportStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transports'] });
      toast({
        title: "Success",
        description: "Transport status updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update transport status",
        variant: "destructive",
      });
    },
  });
};
