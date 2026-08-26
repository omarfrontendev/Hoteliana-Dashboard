import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/layout/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import UsersTable from './components/users-table';
import { useTranslation } from 'react-i18next';
import SuppliersTable from './component/supplier-table';

export default function SuppliersView() {
  const { total, loading } = useSelector((state: any) => state.users);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title={t("users.title")}
        subtitle={t("users.activeUsers", { count: total })}
        loading={loading}
      >
        <Button onClick={() => navigate('/suppliers/create')} className="gap-2 ">
          <Plus className="w-4 h-4" />
          {t("Create Supplier")}
        </Button>
      </PageHeader>

      {/* Table */}
      <SuppliersTable />
    </div>
  );
}
