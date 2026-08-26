import { PageHeader } from '@/layout/components/PageHeader';
import { useTranslation } from 'react-i18next';
import { SupplierForm } from './component/supplier-form';

export default function CreateSupplierPage() {

    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('Create Supplier')}>
            </PageHeader>
            <SupplierForm />
        </div>
    );
}
