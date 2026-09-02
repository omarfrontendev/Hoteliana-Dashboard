import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/FormField';
import { SupplierSchema, type SupplierFormValues } from './agent.schema';
import { useUpsertAgent } from './useUpsertAgent';
import { AgentFields } from './agent.elements';
import { useUploadFile } from '@/hooks/useUpload';
import { useTranslation } from 'react-i18next';
import { City, Country } from 'country-state-city';
import { useState } from 'react';
import AgentAdminForm from './agent-admin-form/AgentAdminForm';

export const AgentForm = () => {
    const [agentId, setAgentId] = useState(null);
    const { mutateAsync: uploadFile, isPending: isUploadingFile } = useUploadFile();
    const { mutate: createAgent, isPending } = useUpsertAgent();
    const { t } = useTranslation();

    const countries = Country.getAllCountries();

    const countryOptions = countries.map((country) => ({
        label: country.name,
        value: country.isoCode,
    }));

    const form = useForm<SupplierFormValues>({
        resolver: zodResolver(SupplierSchema),

        defaultValues: {
            legalCompanyName: '',
            countryCode: '',
            city: '',
            phoneNumber: '',
            email: '',
            commercialRegistrationNumber: '',
            taxCertificateNumber: '',
            tourismLicenseNumber: '',
            bankIban: '',
            // contractEndDate: '',

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
                documents?.bankGuaranteeLetterUploadId && await uploadFile({
                    file: documents?.bankGuaranteeLetterUploadId,
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
                        bankGuaranteeLetter?.uploadId || null,
                },
            };

            await createAgent(finalBody, {
                onSuccess: (e) => {
                    form.reset();
                    setAgentId(e.data.agentId);
                },
            });
        } catch (error) {
            console.error(error);
        }
    };


    if (agentId) return (
        <AgentAdminForm id={agentId} />
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
                            Enter the agent company information.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {AgentFields(countryOptions, citiesOptions).map(
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