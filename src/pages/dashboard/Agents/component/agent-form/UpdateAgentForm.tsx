import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/FormField';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUploadFile, type UploadCategory } from '@/hooks/useUpload';
import { mapSupplierDocuments } from '@/utils/helper';
import { useUpsertAgent } from './useUpsertAgent';
import { UpdateSupplierSchema, type UpdateSupplierFormValues } from './agent.schema';
import { updateAgentFields } from './agent.elements';
// import { useAllPermissions } from '@/hooks/permissions/usePermissions';
// import { dashboardUserRoles } from '@/constants/userRoles';
import { useSingleAgent } from '@/hooks/agents/useSingleAgent';
import { City, Country } from 'country-state-city';
import { useTranslation } from 'react-i18next';

export const UpdateAgentForm = ({ id }: { id?: string }) => {
    const navigate = useNavigate();
    const { mutateAsync: uploadFile, isPending: isUploadingFile } = useUploadFile();
    const { mutate: createAgent, isPending } = useUpsertAgent({ id });

    // const { permissionsProfiles, isLoading } = useAllPermissions();
    // const profilesOptions = permissionsProfiles.map((item: any) => ({ label: item.nameEn, value: item.id }));

    // get user data if id is provided
    const { agent } = useSingleAgent(id);
    const { t } = useTranslation();

    const countries = Country.getAllCountries();

    const countryOptions = countries.map((country) => ({
        label: country.name,
        value: country.isoCode,
    }));

    const form = useForm<UpdateSupplierFormValues>({
        resolver: zodResolver(UpdateSupplierSchema),

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
        if (!agent) return;

        form.reset({
            legalCompanyNameEn: agent.legalCompanyNameEn ?? '',
            legalCompanyNameAr: agent.legalCompanyNameAr ?? '',
            countryCode: agent.countryCode ?? '',
            city: agent.city ?? '',
            phoneNumber: agent.phoneNumber ?? '',
            email: agent.email ?? '',
            commercialRegistrationNumber:
                agent.commercialRegistrationNumber ?? '',
            taxCertificateNumber: agent.taxCertificateNumber ?? '',
            tourismLicenseNumber:
                agent.tourismLicenseNumber ?? '',
            bankIban: agent.bankIban ?? '',
            contractEndDate: agent.contractEndDate ?? '',

            owner: {
                name: agent.owner?.name ?? '',
                phoneNumber: agent.owner?.phoneNumber ?? '',
                email: agent.owner?.email ?? '',
            },
            documents: mapSupplierDocuments(
                agent.documents
            ),
        });
    }, [agent, form]);

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
        values: UpdateSupplierFormValues
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
                    companyOwnerIdUploadId,
                    bankGuaranteeLetterUploadId,
                },
            };

            await createAgent(finalBody, {
                onSuccess: () => {
                    form.reset();
                    navigate("/agents");
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
                        {updateAgentFields(
                            // dashboardUserRoles, profilesOptions, isLoading,
                            countryOptions, citiesOptions
                        ).map((section: any) => (
                            <section key={section.section}>
                                <div className="">
                                    <h2 className="text-lg font-semibold">
                                        {t(`sections.${section.section}.title`)}
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        {t(`sections.${section.section}.description`)}
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
                    {isPending || isUploadingFile ? 'Saving...' : 'Update Agent'}
                </Button>
            </form>
        </Form>
    );
};