import { z } from 'zod';

export const getUserSchema = () => {

    return z
        .object({
            email: z.string()
                .trim()
                .nonempty({ message: 'emailRequired' })
                .email({ message: 'invalidEmail' }),

            username: z
                .string()
                .trim()
                .nonempty({ message: 'username' }),

            phoneNumber: z
                .string()
                .trim()
                .nonempty({ message: 'phoneRequired' }),
        })
};
