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
    commercialRegistration: "commercial_registration",
    taxCertificate: "tax_certificate",
    tourismLicense: "tourism_license",
    supplierContract: "supplier_contract",
    companyOwnerId: "company_owner_id",
    bankGuaranteeLetter: "bank_guarantee_letter",
} as const;


export const mapSupplierDocuments = (
    documents: any[] = []
) => {
    return Object.fromEntries(
        Object.entries(documentConfig).map(
            ([key, documentType]) => {
                const document = documents.find(
                    (doc) =>
                        doc.documentType === documentType
                );

                return [
                    key,
                    {
                        uploadId: document?.uploadId ?? 0,
                        originalName:
                            document?.originalName ?? "",
                        file: null,
                    },
                ];
            }
        )
    );
};