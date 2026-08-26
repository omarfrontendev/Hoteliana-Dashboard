import { useMutation } from '@tanstack/react-query';
import { api } from '@/core/api/client';
import { endpoints } from '@/api/endpoints';

export type UploadCategory =
  | 'commercial_registration'
  | 'tax_certificate'
  | 'tourism_license'
  | 'supplier_contract'
  | 'company_owner_id'
  | 'bank_guarantee_letter';

type UploadFileParams = {
  file: File;
  category: UploadCategory;
};

export type UploadFileResponse = {
  uploadId: number;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  checksumSha256: string;
  category: UploadCategory;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async ({
      file,
      category,
    }: UploadFileParams) => {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('category', category);

      const { data } = await api.post(
        endpoints.uploads.create,
        formData,
      );

      return data.data as UploadFileResponse;
    },
  });
};