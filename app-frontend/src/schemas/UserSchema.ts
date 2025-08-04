import { userTypeSchema } from '@/@types/user-type';
import { z } from 'zod';

export const userSchema = z.object({
    id: z.number().int().optional(),

    type: userTypeSchema,

    email: z.email()
        .min(1, 'E-mail é obrigatório')
        .max(255, 'E-mail não pode ter mais de 255 caracteres'),

    password: z.string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .regex(/[A-Za-z]/, "A senha deve conter pelo menos uma letra")
        .regex(/\d/, "A senha deve conter pelo menos um número"),

    confirmPassword: z.string()
        .min(1, 'Confirmação de senha é obrigatória'),

    name: z.string()
        .min(1, 'Nome é obrigatório')
        .max(100, 'Nome não pode ter mais de 100 caracteres'),

    surname: z.string()
        .min(1, 'Sobrenome é obrigatório')
        .max(100, 'Sobrenome não pode ter mais de 100 caracteres'),

    phone: z.string()
        .min(10, 'Telefone deve ter pelo menos 10 caracteres')
        .max(15, 'Telefone não pode ter mais de 15 caracteres')
        .regex(/^\d+$/, 'Telefone deve conter apenas números')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
})

export type User = z.infer<typeof userSchema>;