import { PageHeader } from '@/layout/components/PageHeader';
import { useTranslation } from 'react-i18next';
import { AgentForm } from './component/agent-form';

export default function CreateAgentPage() {

    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('Create Agent')}>
            </PageHeader>
            <AgentForm />
        </div>
    );
}
