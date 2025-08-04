import { User, userSchema } from '@/schemas/UserSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

const useRegisterUser = () => {

    const { register, handleSubmit, formState: { errors }, getValues, control } = useForm<User>({
        resolver: zodResolver(userSchema),
    })

    const onSubmit = (data: User) => {
        console.log("User registered:", data);
    }

    const getFieldValue = (field: keyof User) => {
        return getValues(field);
    }

    useEffect(() => {
        console.log("Form errors:", errors);
    }, [errors]);

    return {
        register,
        handleSubmit,
        onSubmit,
        getFieldValue,
        errors,
        control
    };
}

export default useRegisterUser;