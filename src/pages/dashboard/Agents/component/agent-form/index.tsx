import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/FormField';
import { SupplierSchema, type SupplierFormValues } from './agent.schema';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUpsertAgent } from './useUpsertAgent';
import { useSingleAgent } from '@/hooks/agents/useSingleAgent';
import { AgentFields } from './agent.elements';



export const AgentForm = ({ id }: { id?: string }) => {
    const navigate = useNavigate();
    const { mutate: createAgent, isPending } = useUpsertAgent();

    // get user data if id is provided
    const { agent } = useSingleAgent(id);

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

            // documents: {
            //     commercialRegistrationUploadId: 0,
            //     taxCertificateUploadId: 0,
            //     tourismLicenseUploadId: 0,
            //     supplierContractUploadId: 0,
            //     companyOwnerIdUploadId: 0,
            //     bankGuaranteeLetterUploadId: 0,
            // },
        },

        mode: 'all',
    });

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

            // documents: {
            //     commercialRegistrationUploadId:
            //         agent.documents?.find(
            //             (doc) =>
            //                 doc.documentType === 'commercial_registration',
            //         )?.uploadId ?? 0,

            //     taxCertificateUploadId:
            //         agent.documents?.find(
            //             (doc) =>
            //                 doc.documentType === 'tax_certificate',
            //         )?.uploadId ?? 0,

            //     tourismLicenseUploadId:
            //         agent.documents?.find(
            //             (doc) =>
            //                 doc.documentType === 'tourism_license',
            //         )?.uploadId ?? 0,

            //     supplierContractUploadId:
            //         supplier.documents?.find(
            //             (doc) =>
            //                 doc.documentType === 'supplier_contract',
            //         )?.uploadId ?? 0,

            //     companyOwnerIdUploadId:
            //         supplier.documents?.find(
            //             (doc) =>
            //                 doc.documentType === 'company_owner_id',
            //         )?.uploadId ?? 0,

            //     bankGuaranteeLetterUploadId:
            //         supplier.documents?.find(
            //             (doc) =>
            //                 doc.documentType === 'bank_guarantee_letter',
            //         )?.uploadId ?? 0,
            // },
        });
    }, [agent, form]);

    const onSubmit = (data: SupplierFormValues) => {
        createAgent(data, {
            onSuccess: () => {
                form.reset();
                navigate("/agents");
            },
        });
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

                    <div className="grid grid-cols-12 gap-4">
                        {AgentFields().map((field: any) => (
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
                    disabled={isPending}
                    className="h-12 w-full"
                >
                    {isPending ? 'Saving...' : 'Create Supplier'}
                </Button>
            </form>
        </Form>
    );
};