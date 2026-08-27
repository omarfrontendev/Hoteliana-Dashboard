import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/FormField';
import { useUpsertSupplier } from './useUpsertSupplier';
import { SupplierSchema, type SupplierFormValues } from './supplier.schema';
import { updateSupplierFields } from './supplier.elements';
import { useNavigate } from 'react-router-dom';
import { useSingleSupplier } from '@/hooks/suppliers/useSingleSupplier';
import { useEffect } from 'react';
import { useUploadFile, type UploadCategory } from '@/hooks/useUpload';
import { mapSupplierDocuments } from '@/utils/helper';
import { useTranslation } from 'react-i18next';
import { City, Country } from 'country-state-city';

export const UpdateSupplierForm = ({ id }: { id?: string }) => {
    const navigate = useNavigate();
    const { mutateAsync: uploadFile, isPending: isUploadingFile } = useUploadFile();
    const { mutate: createSupplier, isPending } = useUpsertSupplier({ id });
    const { t } = useTranslation();


    const countries = Country.getAllCountries();

    const countryOptions = countries.map((country) => ({
        label: country.name,
        value: country.isoCode,
    }));

    // get user data if id is provided
    const { supplier } = useSingleSupplier(id);

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
                commercialRegistrationUploadId: undefined,
                taxCertificateUploadId: undefined,
                tourismLicenseUploadId: undefined,
                supplierContractUploadId: undefined,
                companyOwnerIdUploadId: undefined,
                bankGuaranteeLetterUploadId: undefined,
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

    useEffect(() => {
        if (!supplier) return;

        form.reset({
            legalCompanyNameEn:
                supplier.legalCompanyNameEn ?? "",

            legalCompanyNameAr:
                supplier.legalCompanyNameAr ?? "",

            countryCode:
                supplier.countryCode ?? "",

            city:
                supplier.city ?? "",

            phoneNumber:
                supplier.phoneNumber ?? "",

            email:
                supplier.email ?? "",

            commercialRegistrationNumber:
                supplier.commercialRegistrationNumber ?? "",

            taxCertificateNumber:
                supplier.taxCertificateNumber ?? "",

            tourismLicenseNumber:
                supplier.tourismLicenseNumber ?? "",

            bankIban:
                supplier.bankIban ?? "",

            contractEndDate:
                supplier.contractEndDate ?? "",

            owner: {
                name: supplier.owner?.name ?? "",
                phoneNumber:
                    supplier.owner?.phoneNumber ?? "",
                email: supplier.owner?.email ?? "",
            },

            documents: mapSupplierDocuments(
                supplier.documents
            ),
        });
    }, [supplier, form]);

    const resolveUploadId = async (
        document: {
            uploadId: number | null;
            file: File | null;
        },
        category: UploadCategory,
    ) => {


        if (document instanceof File) {
            const response = await uploadFile({
                file: document,
                category,
            });

            return response.uploadId;
        }

        return document.uploadId;
    };

    const onSubmit = async (
        values: SupplierFormValues
    ) => {
        try {
            const {
                documents,
                ...supplierData
            } = values;

            const [
                commercialRegistrationUploadId,
                taxCertificateUploadId,
                tourismLicenseUploadId,
                supplierContractUploadId,
                companyOwnerIdUploadId,
                bankGuaranteeLetterUploadId,
            ] = await Promise.all([
                resolveUploadId(
                    documents.commercialRegistrationUploadId,
                    "commercial_registration"
                ),

                resolveUploadId(
                    documents.taxCertificateUploadId,
                    "tax_certificate"
                ),

                resolveUploadId(
                    documents.tourismLicenseUploadId,
                    "tourism_license"
                ),

                resolveUploadId(
                    documents.supplierContractUploadId,
                    "supplier_contract"
                ),

                resolveUploadId(
                    documents.companyOwnerIdUploadId,
                    "company_owner_id"
                ),

                resolveUploadId(
                    documents.bankGuaranteeLetterUploadId,
                    "bank_guarantee_letter"
                ),
            ]);

            const finalBody = {
                ...supplierData,

                documents: {
                    commercialRegistrationUploadId,
                    taxCertificateUploadId,
                    tourismLicenseUploadId,
                    supplierContractUploadId,
                    companyOwnerIdUploadId,
                    bankGuaranteeLetterUploadId,
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

                    <div className="grid gap-4">
                        {updateSupplierFields(countryOptions, citiesOptions).map((section) => (
                            <section
                                key={section.title}
                                className="w-full rounded-xl bg-white"
                            >
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold">
                                        {t(`${section.title}`)}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {t(`${section.description}`)}
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
                            </section>
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