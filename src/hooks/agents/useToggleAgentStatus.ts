import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/core/api/client';
import { toast } from 'sonner';
import { endpoints } from '@/api/endpoints';
import { useTranslation } from 'react-i18next';

type ToggleAgentStatusParams = {
  id: string;
  isActive: boolean;
};

export const useToggleAgentStatus = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ id, isActive }: ToggleAgentStatusParams) => {
      const url = isActive
        ? endpoints.agents.deactivateAgent(id)
        : endpoints.agents.activateAgent(id);

      const { data } = await api.patch(url);

      return data;
    },

    onSuccess: (_, variables) => {
      toast.success(
        variables.isActive
          ? t('successDeactivated')
          : t('successActivated')
      );

      queryClient.invalidateQueries({
        queryKey: ['suppliers'],
      });

      queryClient.invalidateQueries({
        queryKey: ['suppliers', variables.id],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          t('common.updateFailed', {
            entity: t('entities.supplier'),
          })
      );
    },
  });
};