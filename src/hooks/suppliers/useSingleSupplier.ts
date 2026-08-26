import { api } from '@/core/api/client';
import { endpoints } from '@/api/endpoints';

import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchSupplier = async (id: string): Promise<any> => {
  const { data } = await api.get(endpoints.suppliers.getSupplierById(id));
  return data?.data;
};

export const useSingleSupplier = (id?: string) => {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['supplier', id],
    queryFn: () => fetchSupplier(id as string),
    enabled: !!id, // only run if id exists
  });

  return {
    supplier: data,
    isLoading,
    isError: error,
    mutate: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ['supplier', id] });
      }
    },
    refetch,
  };
};
