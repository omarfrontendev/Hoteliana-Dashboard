import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/core/api/client';
import { endpoints } from '@/api/endpoints';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import type { SupplierFormValues } from './supplier.schema';


export const useUpsertSupplier = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (body: SupplierFormValues) => {
      const { data } = await api.post(
        endpoints.suppliers.createSupplier,
        body,
      );

      return data;
    },

    onSuccess: () => {
      toast.success(
        t('suppliers.successCreate'),
      );

      queryClient.invalidateQueries({
        queryKey: ['suppliers'],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          t('common.saveFailed', {
            entity: t('entities.supplier'),
          }),
      );
    },
  });
};