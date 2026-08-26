import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/FormField';
import { useUpsertSupplier } from './useUpsertSupplier';
import { SupplierSchema, type SupplierFormValues } from './supplier.schema';
import { supplierFields } from './supplier.elements';
import { useNavigate } from 'react-router-dom';
import { useUploadFile } from '@/hooks/useUpload';

export const SupplierForm = () => {
    const navigate = useNavigate();
    const { mutateAsync: uploadFile, isPending: isUploadingFile } = useUploadFile();
    const { mutate: createSupplier, isPending } = useUpsertSupplier();

    const form = useForm<SupplierFormValues>({
        resolver: zodResolver(SupplierSchema),

        defaultValues: {
            legalCompanyNameEn: '',
            legalCompanyNameAr: '',
            countryCode: '',
            city: '',
            phoneNumber: '',
            email: '',
            commercialRegistrationNumber: '',
            taxCertificateNumber: '',
            tourismLicenseNumber: '',
            bankIban: '',
            contractEndDate: '',

            owner: {
                name: '',
                phoneNumber: '',
                email: '',
            },

            documents: {
                commercialRegistrationUploadId: 0,
                taxCertificateUploadId: 0,
                tourismLicenseUploadId: 0,
                supplierContractUploadId: 0,
                companyOwnerIdUploadId: 0,
                bankGuaranteeLetterUploadId: 0,
            },
        },

        mode: 'all',
    });

    const onSubmit = async (
        values: SupplierFormValues
    ) => {
        try {
            const {
                documents,
                ...supplierData
            } = values;

            const [
                commercialRegistration,
                taxCertificate,
                tourismLicense,
                supplierContract,
                companyOwnerId,
                bankGuaranteeLetter,
            ] = await Promise.all([
                await uploadFile({
                    file: documents.commercialRegistrationUploadId,
                    category: "commercial_registration",
                }),
                await uploadFile({
                    file: documents.taxCertificateUploadId,
                    category: "tax_certificate",
                }),
                await uploadFile({
                    file: documents.tourismLicenseUploadId,
                    category: "tourism_license",
                }),
                await uploadFile({
                    file: documents.supplierContractUploadId,
                    category: "supplier_contract",
                }),
                await uploadFile({
                    file: documents.companyOwnerIdUploadId,
                    category: "company_owner_id",
                }),
                await uploadFile({
                    file: documents.bankGuaranteeLetterUploadId,
                    category: "bank_guarantee_letter",
                }),
            ]);

            const finalBody = {
                ...supplierData,

                documents: {
                    commercialRegistrationUploadId:
                        commercialRegistration.uploadId,

                    taxCertificateUploadId:
                        taxCertificate.uploadId,

                    tourismLicenseUploadId:
                        tourismLicense.uploadId,

                    supplierContractUploadId:
                        supplierContract.uploadId,

                    companyOwnerIdUploadId:
                        companyOwnerId.uploadId,

                    bankGuaranteeLetterUploadId:
                        bankGuaranteeLetter.uploadId,
                },
            };

            await createSupplier(finalBody, {
                onSuccess: () => {
                    form.reset();
                    navigate("/suppliers");
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form {...form}>
            <form
                id="supplier-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="block w-full space-y-8"
            >
                <div className="w-full rounded-xl bg-white p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">
                            Company Information
                        </h2>

                        <p className="text-sm text-gray-500">
                            Enter the supplier company information.
                        </p>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                        {supplierFields().map((field: any) => (
                            <FormField
                                key={field.name}
                                form={form}
                                {...field}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isPending || isUploadingFile}
                    className="h-12 w-full"
                >
                    {isPending || isUploadingFile ? 'Saving...' : 'Create Supplier'}
                </Button>
            </form>
        </Form>
    );
};