import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserSchema } from "./admin.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/FormField";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCreateAgentAdmin } from "./useCreateAgentAdmin";
import { supplierAdminFields } from "./admin.elements";

export default function AgentAdminForm({ id }) {

    const navigate = useNavigate();
    const { t } = useTranslation();

    // create agent admin mutation
    const { mutate: saveUser, isPending } = useCreateAgentAdmin({ agentId: id });

    const form = useForm({
        resolver: zodResolver(getUserSchema()),
        mode: "all"
    });

    const onSubmit = (data) => {
        saveUser(data, {
            onSuccess: () => {
                form.reset();
                navigate("/agents");
            },
        });
    };

    return (
        <Form {...form}>
            <form
                id="user-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="block w-full space-y-6"
            >
                <div className="flex w-full gap-4">
                    <div className="w-full grid grid-cols-12 gap-4">
                        {supplierAdminFields().map((field) => (
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
                    className="w-full h-12"
                >
                    {isPending ? t("buttons.saving") : t("buttons.save")}
                </Button>
            </form>
        </Form>
    );
}
