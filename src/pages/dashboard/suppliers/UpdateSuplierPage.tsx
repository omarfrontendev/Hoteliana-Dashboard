import { PageHeader } from '@/layout/components/PageHeader';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SupplierForm } from './component/supplier-form';

export default function UpdateSupplierPage() {

    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('Update Supplier')}>
            </PageHeader>
            <SupplierForm id={id} />
        </div>
    );
}
