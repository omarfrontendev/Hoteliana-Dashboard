import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/FormField';
import { SupplierSchema, type SupplierFormValues } from './agent.schema';
import { useNavigate } from 'react-router-dom';
import { useUpsertAgent } from './useUpsertAgent';
import { AgentFields } from './agent.elements';
import { useAllPermissions } from '@/hooks/permissions/usePermissions';
import { dashboardUserRoles } from '@/constants/userRoles';
import { useUploadFile } from '@/hooks/useUpload';
import { useTranslation } from 'react-i18next';
import { City, Country } from 'country-state-city';



export const AgentForm = () => {
    const navigate = useNavigate();
    const { mutateAsync: uploadFile, isPending: isUploadingFile } = useUploadFile();
    const { mutate: createAgent, isPending } = useUpsertAgent();
    const { t } = useTranslation();

    const countries = Country.getAllCountries();

    const countryOptions = countries.map((country) => ({
        label: country.name,
        value: country.isoCode,
    }));

    const { permissionsProfiles, isLoading } = useAllPermissions();
    const profilesOptions = permissionsProfiles.map((item: any) => ({ label: item.nameEn, value: item.id }));

    // get user data if id is provided
    // const { agent } = useSingleAgent(id);

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

    const onSubmit = async (
        values: SupplierFormValues
    ) => {
        try {
            const {
                documents,
                ...supplierData
            } = values;

            console.log(values)

            const [
                commercialRegistration,
                taxCertificate,
                tourismLicense,
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

                    companyOwnerIdUploadId:
                        companyOwnerId.uploadId,

                    bankGuaranteeLetterUploadId:
                        bankGuaranteeLetter.uploadId,
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
                            Enter the agent company information.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {AgentFields(dashboardUserRoles, profilesOptions, isLoading, countryOptions, citiesOptions).map(
                                (section) => (
                                    <section
                                        key={section.title}
                                        className="w-full rounded-xl bg-white"
                                    >
                                        <div className="mb-6">
                                            <h2 className="text-lg font-semibold">
                                                {t(`sections.${section.title}`)}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                {t(`sections.${section.description}`)}
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
                                ),
                            )}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isPending || isUploadingFile}
                    className="h-12 w-full"
                >
                    {isPending || isUploadingFile ? 'Saving...' : 'Create Agent'}
                </Button>
            </form>
        </Form>
    );
};