export const resetFields = (fields: string[], form: any) => {
    fields.forEach(field => {
        form.setValue(field, null);
        form.clearErrors(field);
    });
};

export const mapToOptions = (data: any[], labelKey: string) => {
    return data.map((item) => ({
        label: item[labelKey] || "Unknown",
        value: item.id,
    }));
};

export const getApiErrorMessage = (
    error: any,
    fallback = 'Something went wrong'
) => {
    const message = error?.response?.data?.message;

    return Array.isArray(message)
        ? message.join(', ')
        : message || fallback;
};
const documentConfig = {
    commercialRegistrationUploadId: "commercial_registration",
    taxCertificateUploadId: "tax_certificate",
    tourismLicenseUploadId: "tourism_license",
    supplierContractUploadId: "supplier_contract",
    companyOwnerIdUploadId: "company_owner_id",
    bankGuaranteeLetterUploadId: "bank_guarantee_letter",
} as const;

export const mapSupplierDocuments = (
    documents: any[] = [],
): any["documents"] => {
    return Object.fromEntries(
        Object.entries(documentConfig).map(
            ([key, documentType]) => {
                const document = documents.find(
                    (doc) =>
                        doc.documentType === documentType,
                );

                return [
                    key,
                    {
                        // uploadId: document?.uploadId ?? null,
                        // originalName:
                        //     document?.originalName ?? "",
                        // mimeType:
                        //     document?.mimeType ?? "",
                        file: null,
                        ...document
                    },
                ];
            },
        ),
    ) as any["documents"];
};