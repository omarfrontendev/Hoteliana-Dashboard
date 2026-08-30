// src/hooks/suppliers/useCreateSupplierAdmin.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { api } from '@/core/api/client';
import { endpoints } from '@/api/endpoints';
import { cleanAndTrim } from '@/utils/clean-data';

interface CreateSupplierAdminPayload {
    username: string;
    email: string;
    phoneNumber: string;
}

interface CreateSupplierAdminResponse {
    status: string;
    message: string;
    data: unknown;
}

interface Params {
    supplierId: string;
}

export const useCreateSupplierAdmin = ({
    supplierId,
}: Params) => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation<
        CreateSupplierAdminResponse,
        any,
        CreateSupplierAdminPayload
    >({
        mutationFn: async (body) => {

            const url =
                endpoints.suppliers.createSuperAdmin(
                    supplierId
                );

            const cleanedBody = cleanAndTrim(body);

            const { data } = await api.post(
                url,
                cleanedBody
            );

            return data;
        },

        onSuccess: () => {
            toast.success(
                t('suppliers.successAdminCreated')
            );

            // Invalidate supplier-related queries if needed
            queryClient.invalidateQueries({
                queryKey: ['suppliers'],
            });

            queryClient.invalidateQueries({
                queryKey: ['suppliers', supplierId],
            });
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                    t('common.saveFailed', {
                        entity: t('entities.supplierAdmin'),
                    })
            );
        },
    });
};