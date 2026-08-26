import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUploadContent } from "@/hooks/useUpload";
import { useTranslation } from "react-i18next";
import { get } from "lodash";

interface UploadFieldProps {
    name: string;
    label: string;
    required?: boolean;
    colSpan?: string;
    form: any;
    uploadId?: number | null;
}

export const UploadField = ({
    name,
    label,
    required,
    colSpan,
    form,
    uploadId,
}: UploadFieldProps) => {
    const {
        data: blob,
        isLoading,
    } = useGetUploadContent(uploadId);

    const { t } = useTranslation();

    const [previewUrl, setPreviewUrl] =
        useState<string | null>(null);

    useEffect(() => {
        if (!blob) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(blob);

        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [blob]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        // New File
        form.setValue(name, file, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    return (
        <div className={`space-y-2 ${colSpan}`}>
            <Label className="text-slate-700">
                {t(`fields.${label}`)}
                {required ? " *" : ""}
            </Label>

            {/* Existing file */}
            {uploadId && (
                <div className="rounded-lg border p-3">
                    {isLoading && (
                        <p className="text-sm text-muted-foreground">
                            Loading file...
                        </p>
                    )}

                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Current document"
                            className="h-32 w-32 rounded-md object-cover"
                        />
                    )}
                </div>
            )}

            {/* Select new file */}
            <Input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleChange}
            />

            {get(form.formState.errors, name) && (
                <p className="text-xs text-destructive">
                    {t(
                        `validation.${get(
                            form.formState.errors,
                            name
                        )?.message ?? ""}`
                    )}
                </p>
            )}
        </div>
    );
};