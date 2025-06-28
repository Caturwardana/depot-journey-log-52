
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ApiService from '../services/api';
import { toast } from '@/hooks/use-toast';

// Custom hook for transports
export const useTransports = () => {
  const queryClient = useQueryClient();

  const transportsQuery = useQuery({
    queryKey: ['transports'],
    queryFn: async () => {
      const response = await ApiService.getTransports();
      return response.data || [];
    },
  });

  const createTransportMutation = useMutation({
    mutationFn: ApiService.createTransport,
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
        description: error?.message || "Failed to create transport",
        variant: "destructive",
      });
    },
  });

  const updateTransportMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      ApiService.updateTransport(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transports'] });
      toast({
        title: "Success",
        description: "Transport updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update transport",
        variant: "destructive",
      });
    },
  });

  const updateTransportStatusMutation = useMutation({
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
        description: error?.message || "Failed to update transport status",
        variant: "destructive",
      });
    },
  });

  const deleteTransportMutation = useMutation({
    mutationFn: ApiService.deleteTransport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transports'] });
      toast({
        title: "Success",
        description: "Transport deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete transport",
        variant: "destructive",
      });
    },
  });

  return {
    transports: transportsQuery.data || [],
    isLoading: transportsQuery.isLoading,
    error: transportsQuery.error,
    createTransport: createTransportMutation.mutateAsync,
    updateTransport: updateTransportMutation.mutateAsync,
    updateTransportStatus: updateTransportStatusMutation.mutateAsync,
    deleteTransport: deleteTransportMutation.mutateAsync,
    refetch: transportsQuery.refetch,
  };
};

// Custom hook for users
export const useUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await ApiService.getUsers();
      return response.data || [];
    },
  });

  const createUserMutation = useMutation({
    mutationFn: ApiService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Success",
        description: "User created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to create user",
        variant: "destructive",
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      ApiService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update user",
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: ApiService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete user",
        variant: "destructive",
      });
    },
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    createUser: createUserMutation.mutateAsync,
    updateUser: updateUserMutation.mutateAsync,
    deleteUser: deleteUserMutation.mutateAsync,
    refetch: usersQuery.refetch,
  };
};

// Custom hook for documents/file uploads
export const useDocuments = () => {
  const queryClient = useQueryClient();

  const documentsQuery = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const response = await ApiService.getDocuments();
      return response.data || [];
    },
  });

  const uploadDocumentMutation = useMutation({
    mutationFn: ApiService.uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to upload document",
        variant: "destructive",
      });
    },
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: ({ file, transportId, type }: { file: File; transportId: string; type: string }) =>
      ApiService.uploadPhoto(file, transportId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({
        title: "Success",
        description: "Photo uploaded successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to upload photo",
        variant: "destructive",
      });
    },
  });

  const deleteDocumentMutation = useMutation({
    mutationFn: ApiService.deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete document",
        variant: "destructive",
      });
    },
  });

  return {
    documents: documentsQuery.data || [],
    isLoading: documentsQuery.isLoading,
    error: documentsQuery.error,
    uploadDocument: uploadDocumentMutation.mutateAsync,
    uploadPhoto: uploadPhotoMutation.mutateAsync,
    deleteDocument: deleteDocumentMutation.mutateAsync,
    refetch: documentsQuery.refetch,
  };
};

// Custom hook for fuel quality
export const useFuelQuality = () => {
  const queryClient = useQueryClient();

  const fuelQualityQuery = useQuery({
    queryKey: ['fuelQuality'],
    queryFn: async () => {
      const response = await ApiService.getFuelQuality();
      return response.data || [];
    },
  });

  const createFuelQualityMutation = useMutation({
    mutationFn: ApiService.createFuelQuality,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuelQuality'] });
      toast({
        title: "Success",
        description: "Fuel quality data recorded successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to record fuel quality data",
        variant: "destructive",
      });
    },
  });

  const updateFuelQualityMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      ApiService.updateFuelQuality(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuelQuality'] });
      toast({
        title: "Success",
        description: "Fuel quality data updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update fuel quality data",
        variant: "destructive",
      });
    },
  });

  return {
    fuelQuality: fuelQualityQuery.data || [],
    isLoading: fuelQualityQuery.isLoading,
    error: fuelQualityQuery.error,
    createFuelQuality: createFuelQualityMutation.mutateAsync,
    updateFuelQuality: updateFuelQualityMutation.mutateAsync,
    refetch: fuelQualityQuery.refetch,
  };
};

// Custom hook for flow meters
export const useFlowMeters = () => {
  const queryClient = useQueryClient();

  const flowMetersQuery = useQuery({
    queryKey: ['flowMeters'],
    queryFn: async () => {
      const response = await ApiService.getFlowMeters();
      return response.data || [];
    },
  });

  const updateFlowMeterMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      ApiService.updateFlowMeter(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flowMeters'] });
      toast({
        title: "Success",
        description: "Flow meter updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update flow meter",
        variant: "destructive",
      });
    },
  });

  return {
    flowMeters: flowMetersQuery.data || [],
    isLoading: flowMetersQuery.isLoading,
    error: flowMetersQuery.error,
    updateFlowMeter: updateFlowMeterMutation.mutateAsync,
    refetch: flowMetersQuery.refetch,
  };
};
