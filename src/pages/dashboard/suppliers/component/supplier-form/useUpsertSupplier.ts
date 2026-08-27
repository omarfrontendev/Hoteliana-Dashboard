import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/core/api/client';
import { endpoints } from '@/api/endpoints';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import type { SupplierFormValues } from './supplier.schema';

type Params = {
  id?: string;
};

export const useUpsertSupplier = ({ id }: Params = {}) => {
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (body: SupplierFormValues) => {
      const url = isEdit
        ? endpoints.suppliers.updateSupplier(id!)
        : endpoints.suppliers.createSupplier;

      const method = isEdit ? 'patch' : 'post';

      const { data } = await api[method](url, body);

      return data;
    },

    onSuccess: (res) => {
      toast.success(
        res?.message || t(id ? 'success Create' : "Success Update"),
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