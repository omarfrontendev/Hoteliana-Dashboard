import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/FormField';
import { useUpsertSupplier } from './useUpsertSupplier';
import { SupplierSchema, type SupplierFormValues } from './supplier.schema';
import { supplierSections } from './supplier.elements';
import { useUploadFile } from '@/hooks/useUpload';
import { useState } from 'react';
import SupplierAdminForm from './supplier-admin-form/SupplierAdminForm';
import { City, Country } from 'country-state-city';
import { useTranslation } from 'react-i18next';

export const SupplierForm = () => {
    const [supplierId, setSupplierId] = useState(null);
    const { mutateAsync: uploadFile, isPending: isUploadingFile } = useUploadFile();
    const { mutate: createSupplier, isPending } = useUpsertSupplier();
    const { t } = useTranslation();

    const countries = Country.getAllCountries();

    const countryOptions = countries.map((country) => ({
        label: country.name,
        value: country.isoCode,
    }));

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

    const countryCode = form.watch("countryCode");
    const cities = countryCode
        ? City.getCitiesOfCountry(countryCode)
        : [];

    const citiesOptions = cities.map((city) => ({
        label: city.name,
        value: city.stateCode,
    }));

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
                onSuccess: (e) => {
                    form.reset();
                    setSupplierId(e.data.supplierId)
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (supplierId) return (
        <SupplierAdminForm id={supplierId} />
    )

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

                    {supplierSections(
                        countryOptions,
                        citiesOptions
                    ).map((section) => (
                        <div
                            key={section.title}
                            className="w-full"
                        >
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold">
                                    {t(`${section.title}`)}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {t(
                                        `${section.description}`
                                    )}
                                </p>
                            </div>

                            <div className="grid grid-cols-12 gap-4">
                                {section.fields.map((field: any) => (
                                    <FormField
                                        key={field.name}
                                        form={form}
                                        {...field}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
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