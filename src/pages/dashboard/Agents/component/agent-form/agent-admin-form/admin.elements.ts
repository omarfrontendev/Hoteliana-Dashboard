export const supplierAdminFields = () => {

    return [
        {
            name: "username",
            label: "Username.label",
            placeholder: "Username.placeholder",
            colSpan: "col-span-6",
            type: "text",
            required: true,
        },
        {
            name: "email",
            label: "email.label",
            placeholder: "email.placeholder",
            colSpan: "col-span-6",
            type: "email",
            required: true,
        },
        {
            name: "phoneNumber",
            label: "phone.label",
            placeholder: "phone.placeholder",
            colSpan: "col-span-6",
            type: "number",
        },
    ];
}