// import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";
import { AgentsActionsCell } from "./AgentsActionCell";

export const useAgentsColumns = (setRefreshData: any, setStatusDialog: any) => {

  const { t } = useTranslation();

  return [
    {
      id: 'agentId',
      header: () => t("ID"),
      cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-mono hover:text-primary-active mb-px truncate block">
            {row.original.agentId}
          </div>
        </div>
      ),
      enableSorting: false,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'legalCompanyNameEn',
      header: () => t("CompanyName"),
      cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-mono hover:text-primary-active mb-px truncate block">
            {row.original.legalCompanyNameEn}
          </div>
        </div>
      ),
      enableSorting: false,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'countryCode',
      header: () => t("country"),
      cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-mono hover:text-primary-active mb-px truncate block">
            {row.original.countryCode}
          </div>
        </div>
      ),
      enableSorting: false,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'city',
      header: () => t("city"),
      cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-mono hover:text-primary-active mb-px truncate block">
            {row.original.city}
          </div>
        </div>
      ),
      enableSorting: false,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'email',
      header: () => t("fields.email.label"),
      cell: ({ row }: any) => (
        <a
          href={`mailto:${row.original.email}`}
          className="truncate block"
          title={row.original.email}
        >{row.original.email}</a>
      ),
      enableSorting: false,
      minSize: 200,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'phoneNumber',
      header: () => t("phoneNumber"),
      cell: ({ row }: any) => (
        <div>{t(`${row.original.phoneNumber}`)}</div>
      ),
      enableSorting: false,
      size: 200,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'isActive',
      header: () => t("fields.status.label"),
      cell: ({ row }: any) => {

        const isActive = row.original.status === "active";

        return (
          <div className="flex items-center justify-center gap-2">
            <Switch
              checked={isActive}
              onCheckedChange={() => setStatusDialog(row.original)}
              aria-label={isActive ? t("buttons.activated") : t("buttons.deactivated")}
            />
            <span className="text-xs text-muted-foreground">
              {isActive ? t("buttons.activated") : t("buttons.deactivated")}
            </span>
          </div>
        )
      },
      enableSorting: false,
      size: 200,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'actions',
      cell: ({ row }: any) => (
        <AgentsActionsCell
          row={row}
          setRefreshData={setRefreshData}
        />
      ),
      enableSorting: false,
      size: 50,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
  ];
};
