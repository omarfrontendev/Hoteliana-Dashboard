import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useToggleAgentStatus } from "@/hooks/agents/useToggleAgentStatus";
import { updateAgentStatus } from "@/app/store/features/agents/agents.slice";

type ToggleStatusDialogProps = {
    data: boolean | { status: string; agentId?: string, };
    setData: (data: boolean) => void;
};

export default function ToggleStatusDialog({
    data,
    setData,
}: ToggleStatusDialogProps) {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const isActive = typeof data === "object" ? data?.status === "active" : false;
    const userName = typeof data === "object" ? data?.agentId + " " : t("common.thisUser");
    const id = typeof data === "object" ? data?.agentId : null;

    // const { mutate: saveUser, isPending } = useUpsertUser({ id });

    const { mutate: toggleSupplierStatus, isPending } = useToggleAgentStatus();

    const onToggleUserStatus = () => toggleSupplierStatus({
        id,
        isActive,
    }, {
        onSuccess: () => {
            setData(false);
            // Toggle status Todo:=
            dispatch(updateAgentStatus({ id, isActive: !isActive }));

        },
    });

    return (
        <Dialog open={!!data} onOpenChange={(val) => setData(val)}>
            <DialogContent className="max-w-md mx-auto p-6 rounded-lg">
                <DialogHeader>
                    <h2 className="text-lg font-semibold">
                        {isActive ? t(`dialog.deactivate`) : t(`dialog.activate`)}
                    </h2>
                </DialogHeader>

                <div className="py-4 text-sm text-gray-700">
                    {t('dialog.confirmStatusChange', {
                        action: isActive
                            ? t('buttons.deactivate')
                            : t('buttons.activate'),
                        name: userName,
                    })}
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setData(false)}
                        disabled={isPending}
                    >
                        {t("buttons.cancel")}
                    </Button>

                    <Button
                        variant={isActive ? "deactivate" : "activate"}
                        onClick={onToggleUserStatus}
                        disabled={isPending}
                    >
                        {isPending ? t("buttons.processing") : isActive ? t("buttons.deactivate") : t("buttons.activate")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}
