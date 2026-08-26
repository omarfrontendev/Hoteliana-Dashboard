import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/layout/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import UsersTable from './components/users-table';
import { useTranslation } from 'react-i18next';
import AgentsTable from './component/agents-table';

export default function AgentsView() {
  const { total, loading } = useSelector((state: any) => state.agents);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title={t("Agents")}
        subtitle={t("users.activeUsers", { count: total })}
        loading={loading}
      >
        <Button onClick={() => navigate('/agents/create')} className="gap-2 ">
          <Plus className="w-4 h-4" />
          {t("Create Agent")}
        </Button>
      </PageHeader>

      {/* Table */}
      <AgentsTable />
    </div>
  );
}
