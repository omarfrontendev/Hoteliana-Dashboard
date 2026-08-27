import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUploadContent } from "@/hooks/useUpload";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { FileText } from "lucide-react";

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

    // File when user selects a new file
    const updatedFile = form.watch(name);

    const { t } = useTranslation();

    const [previewUrl, setPreviewUrl] =
        useState<string | null>(null);

    useEffect(() => {
        // New file selected
        if (updatedFile instanceof File) {
            const url = URL.createObjectURL(updatedFile);

            setPreviewUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }

        // Existing file from API
        if (blob) {
            const url = URL.createObjectURL(blob);

            setPreviewUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }

        setPreviewUrl(null);
    }, [blob, updatedFile]);

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
            {/* Existing file */}
            {uploadId && !(updatedFile instanceof File) && (
                <div className="rounded-lg border p-3">
                    {isLoading && (
                        <p className="text-sm text-muted-foreground">
                            Loading file...
                        </p>
                    )}

                    {previewUrl && blob?.type === "application/pdf" ? (
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-red-50">
                                <FileText className="h-6 w-6 text-red-600" />
                            </div>

                            <div>
                                <p className="text-sm font-medium">
                                    PDF Document
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {form.watch(name)?.originalName ? form.watch(name)?.originalName : "PDF file"}
                                </p>
                            </div>
                        </div>
                    ) : (
                        previewUrl && (
                            <>
                                <img
                                    src={previewUrl}
                                    alt="Current document"
                                    className="h-32 w-32 rounded-md object-cover"
                                />
                                <p className="text-xs text-muted-foreground mt-3">
                                    {form.watch(name)?.originalName ? form.watch(name)?.originalName : "PDF file"}
                                </p>
                            </>
                        )
                    )}
                </div>
            )}

            {/* New selected file */}
            {/* New selected file */}
            {updatedFile instanceof File && (
                <div className="rounded-lg border p-3">
                    {updatedFile.type === "application/pdf" ? (
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-red-50">
                                <FileText className="h-6 w-6 text-red-600" />
                            </div>

                            <div>
                                <p className="text-sm font-medium">
                                    {updatedFile.name}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    PDF file
                                </p>
                            </div>
                        </div>
                    ) : (
                        previewUrl && (
                            <img
                                src={previewUrl}
                                alt={updatedFile.name}
                                className="h-32 w-32 rounded-md object-cover"
                            />
                        )
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