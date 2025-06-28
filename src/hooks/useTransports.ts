
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
    mutationFn: async (transportData: any) => {
      return await ApiService.createTransport(transportData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transports'] });
      toast({
        title: "Success",
        description: "Transport created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create transport",
        variant: "destructive",
      });
      console.error('Create transport error:', error);
    },
  });
};

export const useUpdateTransport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await ApiService.updateTransport(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transports'] });
      toast({
        title: "Success",
        description: "Transport updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update transport",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteTransport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await ApiService.deleteTransport(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transports'] });
      toast({
        title: "Success",
        description: "Transport deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete transport",
        variant: "destructive",
      });
    },
  });
};
