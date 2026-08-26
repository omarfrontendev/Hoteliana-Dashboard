import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/core/api/client';
import { endpoints } from '@/api/endpoints';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import type { SupplierFormValues } from './agent.schema';

type Params = {
  id?: string;
};

export const useUpsertAgent = ({ id }: Params = {}) => {
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (body: SupplierFormValues) => {
      const url = isEdit
        ? endpoints.agents.updateAgent(id!)
        : endpoints.agents.createAgent;

      const method = isEdit ? 'patch' : 'post';

      const { data } = await api[method](url, body);

      return data;
    },

    onSuccess: (res) => {
      toast.success(
        res?.message || t('successCreate'),
      );

      queryClient.invalidateQueries({
        queryKey: ['agents'],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
        t('common.saveFailed', {
          entity: t('entities.agent'),
        }),
      );
    },
  });
};