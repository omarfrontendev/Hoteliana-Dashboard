import { z } from 'zod';

export const SupplierSchema = z.object({
    legalCompanyNameEn: z.string().min(1, 'English company name is required'),
    legalCompanyNameAr: z.string().min(1, 'Arabic company name is required'),

    countryCode: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),

    phoneNumber: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address'),

    commercialRegistrationNumber: z
        .string()
        .min(1, 'Commercial registration number is required'),

    taxCertificateNumber: z
        .string()
        .min(1, 'Tax certificate number is required'),

    tourismLicenseNumber: z
        .string()
        .min(1, 'Tourism license number is required'),

    bankIban: z
        .string()
        .min(1, 'Bank IBAN is required')
        .refine(
            (value) => {
                const iban = value.replace(/\s/g, '').toUpperCase();

                if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(iban)) {
                    return false;
                }

                const rearranged = iban.slice(4) + iban.slice(0, 4);

                const numeric = rearranged
                    .split('')
                    .map((char) =>
                        /[A-Z]/.test(char)
                            ? (char.charCodeAt(0) - 55).toString()
                            : char,
                    )
                    .join('');

                let remainder = 0;

                for (const digit of numeric) {
                    remainder = (remainder * 10 + Number(digit)) % 97;
                }

                return remainder === 1;
            },
            {
                message: 'Please enter a valid IBAN',
            },
        ),

    contractEndDate: z
        .string()
        .min(1, 'Contract end date is required')
        .refine(
            (date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const contractDate = new Date(`${date}T00:00:00`);

                return contractDate >= today;
            },
            {
                message: 'Contract end date must not be in the past',
            },
        ),

    owner: z.object({
        name: z.string().min(1, 'Owner name is required'),

        phoneNumber: z
            .string()
            .min(1, 'Owner phone number is required'),

        email: z
            .string()
            .email('Invalid owner email address'),
    }),

    // documents: z.object({
    //     commercialRegistrationUploadId: z.number().min(1),
    //     taxCertificateUploadId: z.number().min(1),
    //     tourismLicenseUploadId: z.number().min(1),
    //     supplierContractUploadId: z.number().min(1),
    //     companyOwnerIdUploadId: z.number().min(1),
    //     bankGuaranteeLetterUploadId: z.number().min(1),
    // }),
});

export type SupplierFormValues = z.infer<
    typeof SupplierSchema
>;