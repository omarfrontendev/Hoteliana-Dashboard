import { api } from '@/core/api/client';
import { endpoints } from '@/api/endpoints';

import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchAgent = async (id: string): Promise<any> => {
  const { data } = await api.get(endpoints.agents.getAgentById(id));
  return data?.data;
};

export const useSingleAgent = (id?: string) => {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['agent', id],
    queryFn: () => fetchAgent(id as string),
    enabled: !!id, // only run if id exists
  });

  return {
    agent: data,
    isLoading,
    isError: error,
    mutate: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ['agent', id] });
      }
    },
    refetch,
  };
};
