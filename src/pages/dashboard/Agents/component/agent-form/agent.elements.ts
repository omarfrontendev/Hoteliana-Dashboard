export const AgentFields = (
    // roles: any[],
    // permissionsProfiles: any[],
    // isLoading: boolean,
    countryOptions: any[],
    citiesOptions: any[]
) => {
    return [
        {
            title: "companyInformation",
            description: "companyInformationDescription",
            fields: [
                {
                    name: "legalCompanyName",
                    label: "legalCompanyName",
                    placeholder: "legalCompanyName",
                    colSpan: "col-span-6",
                    type: "text",
                    required: true,
                },
                {
                    name: "countryCode",
                    label: "countryCode",
                    placeholder: "countryCode",
                    colSpan: "col-span-6",
                    type: "select",
                    required: true,
                    list: countryOptions
                },
                {
                    name: "city",
                    label: "city",
                    placeholder: "city",
                    colSpan: "col-span-6",
                    type: "select",
                    required: true,
                    list: citiesOptions
                },
                {
                    name: "phoneNumber",
                    label: "phoneNumber",
                    placeholder: "phoneNumber",
                    colSpan: "col-span-6",
                    type: "number",
                    required: true,
                },
                {
                    name: "email",
                    label: "Email",
                    placeholder: "Email",
                    colSpan: "col-span-6",
                    type: "email",
                    required: true,
                },
            ],
        },

        {
            title: "businessInformation",
            description: "businessInformationDescription",
            fields: [
                {
                    name: "commercialRegistrationNumber",
                    label: "commercialRegistrationNumber",
                    placeholder: "commercialRegistrationNumber",
                    colSpan: "col-span-6",
                    type: "text",
                    required: true,
                },
                {
                    name: "taxCertificateNumber",
                    label: "taxCertificateNumber",
                    placeholder: "taxCertificateNumber",
                    colSpan: "col-span-6",
                    type: "text",
                    required: true,
                },
                {
                    name: "tourismLicenseNumber",
                    label: "tourismLicenseNumber",
                    placeholder: "tourismLicenseNumber",
                    colSpan: "col-span-6",
                    type: "text",
                    required: true,
                },
                {
                    name: "bankIban",
                    label: "bankIban",
                    placeholder: "bankIban",
                    colSpan: "col-span-6",
                    type: "text",
                    required: true,
                },
            ],
        },

        {
            title: "ownerInformation",
            description: "ownerInformationDescription",
            fields: [
                {
                    name: "owner.name",
                    label: "name",
                    placeholder: "name",
                    colSpan: "col-span-6",
                    type: "text",
                    required: true,
                },
                {
                    name: "owner.phoneNumber",
                    label: "phoneNumber",
                    placeholder: "phoneNumber",
                    colSpan: "col-span-6",
                    type: "number",
                    required: true,
                },
                {
                    name: "owner.email",
                    label: "email",
                    placeholder: "email",
                    colSpan: "col-span-6",
                    type: "email",
                    required: true,
                },
            ],
        },

        // {
        //     title: "mainUser",
        //     description: "mainUserDescription",
        //     fields: [
        //         {
        //             name: "mainUser.username",
        //             label: "Username.label",
        //             placeholder: "Username.placeholder",
        //             colSpan: "col-span-6",
        //             type: "text",
        //             required: true,
        //         },
        //         {
        //             name: "mainUser.email",
        //             label: "email.label",
        //             placeholder: "email.placeholder",
        //             colSpan: "col-span-6",
        //             type: "email",
        //             required: true,
        //         },
        //         {
        //             name: "mainUser.phoneNumber",
        //             label: "phone.label",
        //             placeholder: "phone.placeholder",
        //             colSpan: "col-span-6",
        //             type: "number",
        //         },
        //     ],
        // },

        {
            title: "documents",
            description: "documentsDescription",
            fields: [
                {
                    name: "documents.commercialRegistrationUploadId",
                    label: "commercialRegistration",
                    colSpan: "col-span-6",
                    type: "upload",
                    required: true,
                    uploadCategory: "commercial_registration",
                },
                {
                    name: "documents.taxCertificateUploadId",
                    label: "taxCertificate",
                    colSpan: "col-span-6",
                    type: "upload",
                    required: true,
                    uploadCategory: "tax_certificate",
                },
                {
                    name: "documents.tourismLicenseUploadId",
                    label: "tourismLicense",
                    colSpan: "col-span-6",
                    type: "upload",
                    required: true,
                    uploadCategory: "tourism_license",
                },
                {
                    name: "documents.companyOwnerIdUploadId",
                    label: "companyOwnerId",
                    colSpan: "col-span-6",
                    type: "upload",
                    required: true,
                    uploadCategory: "company_owner_id",
                },
                {
                    name: "documents.bankGuaranteeLetterUploadId",
                    label: "bankGuaranteeLetter",
                    colSpan: "col-span-6",
                    type: "upload",
                    required: false,
                    uploadCategory: "bank_guarantee_letter",
                },
            ],
        },
    ];
};

export const updateAgentFields = (
    // roles: any[],
    // permissionsProfiles: any[],
    // isLoading: boolean,
    countryOptions: any[],
    citiesOptions: any[]
) => {
    return [
        // ============================================
        // Company Information
        // ============================================
        {
            section: "companyInformation",
            fields: [
                {
                    name: 'legalCompanyName',
                    label: 'legalCompanyName',
                    placeholder: 'legalCompanyName',
                    colSpan: 'col-span-6',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'countryCode',
                    label: 'countryCode',
                    placeholder: 'countryCode',
                    colSpan: 'col-span-6',
                    type: 'select',
                    required: true,
                    list: countryOptions
                },
                {
                    name: 'city',
                    label: 'city',
                    placeholder: 'city',
                    colSpan: 'col-span-6',
                    type: 'select',
                    required: true,
                    list: citiesOptions
                },
                {
                    name: 'phoneNumber',
                    label: 'phoneNumber',
                    placeholder: 'phoneNumber',
                    colSpan: 'col-span-6',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'email',
                    label: 'Email',
                    placeholder: 'Email',
                    colSpan: 'col-span-6',
                    type: 'email',
                    required: true,
                },
                {
                    name: 'commercialRegistrationNumber',
                    label: 'commercialRegistrationNumber',
                    placeholder: 'commercialRegistrationNumber',
                    colSpan: 'col-span-6',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'taxCertificateNumber',
                    label: 'taxCertificateNumber',
                    placeholder: 'taxCertificateNumber',
                    colSpan: 'col-span-6',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'tourismLicenseNumber',
                    label: 'tourismLicenseNumber',
                    placeholder: 'tourismLicenseNumber',
                    colSpan: 'col-span-6',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'bankIban',
                    label: 'bankIban',
                    placeholder: 'bankIban',
                    colSpan: 'col-span-6',
                    type: 'text',
                    required: true,
                },
            ],
        },

        // ============================================
        // Owner Information
        // ============================================
        // {
        //     section: "ownerInformation",
        //     fields: [
        //         {
        //             name: 'owner.name',
        //             label: 'owner.name',
        //             placeholder: 'owner.name',
        //             colSpan: 'col-span-4',
        //             type: 'text',
        //             required: true,
        //         },
        //         {
        //             name: 'owner.phoneNumber',
        //             label: 'owner.phoneNumber',
        //             placeholder: 'owner.phoneNumber',
        //             colSpan: 'col-span-4',
        //             type: 'number',
        //             required: true,
        //         },
        //         {
        //             name: 'owner.email',
        //             label: 'owner.email',
        //             placeholder: 'owner.email',
        //             colSpan: 'col-span-4',
        //             type: 'email',
        //             required: true,
        //         },
        //     ],
        // },

        // ============================================
        // Main User
        // ============================================
        // {
        //     section: "mainUser",
        //     fields: [
        //         {
        //             name: "mainUser.username",
        //             label: "Username.label",
        //             placeholder: "Username.placeholder",
        //             colSpan: "col-span-6",
        //             type: "text",
        //             required: true,
        //         },
        //         {
        //             name: "mainUser.email",
        //             label: "email.label",
        //             placeholder: "email.placeholder",
        //             colSpan: "col-span-6",
        //             type: "email",
        //             required: true,
        //         },
        //         {
        //             name: "mainUser.phoneNumber",
        //             label: "phone.label",
        //             placeholder: "phone.placeholder",
        //             colSpan: "col-span-6",
        //             type: "text",
        //         },
        //         {
        //             name: "mainUser.role",
        //             label: "role.label",
        //             placeholder: "role.placeholder",
        //             colSpan: "col-span-6",
        //             type: "select",
        //             required: false,
        //             list: roles,
        //         },
        //         {
        //             name: "mainUser.permissionProfileIds",
        //             label: "profilePermission.label",
        //             placeholder: "role.profilePermission",
        //             colSpan: "col-span-6",
        //             type: "select",
        //             required: true,
        //             list: permissionsProfiles,
        //             isLoading,
        //         },
        //     ],
        // },

        // ============================================
        // Documents
        // ============================================
        {
            section: "documents",
            fields: [
                {
                    name: 'documents.commercialRegistrationUploadId',
                    label: 'documents.commercialRegistration',
                    colSpan: 'col-span-6',
                    type: 'uploadId',
                    required: true,
                    uploadCategory: 'commercial_registration',
                },
                {
                    name: 'documents.taxCertificateUploadId',
                    label: 'documents.taxCertificate',
                    colSpan: 'col-span-6',
                    type: 'uploadId',
                    required: true,
                    uploadCategory: 'tax_certificate',
                },
                {
                    name: 'documents.tourismLicenseUploadId',
                    label: 'documents.tourismLicense',
                    colSpan: 'col-span-6',
                    type: 'uploadId',
                    required: true,
                    uploadCategory: 'tourism_license',
                },
                {
                    name: 'documents.companyOwnerIdUploadId',
                    label: 'documents.companyOwnerId',
                    colSpan: 'col-span-6',
                    type: 'uploadId',
                    required: true,
                    uploadCategory: 'company_owner_id',
                },
                {
                    name: 'documents.bankGuaranteeLetterUploadId',
                    label: 'documents.bankGuaranteeLetter',
                    colSpan: 'col-span-6',
                    type: 'uploadId',
                    required: false,
                    uploadCategory: 'bank_guarantee_letter',
                },
            ],
        },
    ];
};