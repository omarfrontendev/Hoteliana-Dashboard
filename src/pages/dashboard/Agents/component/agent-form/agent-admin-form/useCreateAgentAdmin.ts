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
    agentId: string;
}

export const useCreateAgentAdmin = ({
    agentId,
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
                endpoints.agents.createAgentAdmin(
                    agentId
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
                t('agents.successAdminCreated')
            );

            // Invalidate agent-related queries if needed
            queryClient.invalidateQueries({
                queryKey: ['agents'],
            });

            queryClient.invalidateQueries({
                queryKey: ['agents', agentId],
            });
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                    t('common.saveFailed', {
                        entity: t('entities.agentAdmin'),
                    })
            );
        },
    });
};