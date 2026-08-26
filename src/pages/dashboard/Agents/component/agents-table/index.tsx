import MainTable from "@/components/common/MainTable";
import { Card } from "@/components/ui/card";
// import Filter from "../../../../../components/ui/Filter";
import TableSearch from "@/components/ui/table-search";
import ToggleStatusDialog from "./components/ToggleStatusDialog";
import { useTranslation } from "react-i18next";
import { useAgentssTableLogic } from "./hooks/useAgentsTableLogic";
// import { dashboardUserRoles } from "@/constants/userRoles";

export default function AgentsTable() {

    const { t } = useTranslation();

    const {
        loading,
        totalCount,
        table,
        // statusFilter,
        // statusList,
        statusDialog,
        // roleFilter,
        // onRoleFilter,
        setStatusDialog,
        onSearch,
        onClearSearch,
        // onStatusFilter,
    } = useAgentssTableLogic();

    return (
        <div className="grid gap-2">
            <MainTable
                TableFilters={
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <div className="relative w-100">
                                <TableSearch
                                    placeholder={t("users.searchPlaceholder")}
                                    onSearch={onSearch}
                                    onClearSearch={onClearSearch} />
                            </div>
                            {/* <div className="w-40">
                                <Filter
                                    placeholder={t("filters.status")}
                                    value={statusFilter}
                                    options={statusList}
                                    onChange={onStatusFilter}
                                />
                            </div> */}
                            {/* <div className="w-40">
                                <Filter
                                    placeholder={t("fields.role.label")}
                                    value={roleFilter}
                                    options={dashboardUserRoles}
                                    onChange={onRoleFilter}
                                />
                            </div> */}
                        </div>
                    </Card>
                }
                table={table}
                loading={loading}
                totalCount={totalCount}
            />

            <ToggleStatusDialog
                data={statusDialog}
                setData={(data: boolean) => { if (!data) setStatusDialog(false); }}
            />
        </div>
    );
}
