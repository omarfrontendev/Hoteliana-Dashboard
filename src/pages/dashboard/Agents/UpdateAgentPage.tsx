import { PageHeader } from '@/layout/components/PageHeader';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AgentForm } from './component/agent-form';

export default function UpdateAgentPage() {

    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('Update Agent')}>
            </PageHeader>
            <AgentForm id={id} />
        </div>
    );
}
