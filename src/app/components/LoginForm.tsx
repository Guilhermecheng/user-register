'use client';

import { useRouter } from "next/navigation";
import { Button, Input } from "@mui/base";

import { FieldValues, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const signInFormValidation = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
    }),
    password: z.string().min(3, { message: "A valid password is required (at least 3 digits)" }),
})

type SignInValidationSchema = z.infer<typeof signInFormValidation>;

export function LoginForm() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors  } } = useForm<SignInValidationSchema>({
        resolver: zodResolver(signInFormValidation),
    });


    function signin(data: FieldValues) {
        console.log(data)
        router.push('/dashboard');
    }

    return (
        <div className="text-alleasy-blue w-full max-w-[500px] flex flex-col items-center justify-center bg-white px-4 sm:px-6 md:px-8 py-6 md:py-10 rounded-xl shadow-xl shadow-zinc-800">
            <h1 className=" text-2xl md:text-3xl font-bold mb-1">Bem vindo de volta!</h1>
            <h1 className="text-sm md:text-base">Entre para continuar</h1>

            <form className="w-full flex flex-col justify-center mt-10" onSubmit={handleSubmit(signin)}>
                <label htmlFor="" className="text-sm md:text-base">
                    Email    
                    {errors.email && <span className="text-xs text-red-500 ml-4">{errors.email?.message}</span>}
                </label> 
                <Input
                    className="w-full mt-2 mb-6"
                    {...register("email", { required: true })}
                    slotProps={{
                        input: {
                            className:'w-full text-sm md:text-base px-4 py-4 rounded border border-solid border-slate-300',
                        },
                    }}
                    aria-label="email input"
                    placeholder="Email"
                />

                <label htmlFor="" className="text-sm md:text-base">
                    Senha
                    {errors.password && <span className="text-xs text-red-500 ml-4">{errors.password?.message}</span>}
                </label>
                <Input
                    className="w-full mt-2 mb-6"
                    {...register("password", { required: true })}
                    slotProps={{
                        input: {
                            className:'w-full text-sm md:text-base px-4 py-4 rounded border border-solid border-slate-300',
                            type: "password"
                        },
                    }}
                    aria-label="password input"
                    placeholder="Password"
                />

                <Button type="submit" className="w-full py-2 md:py-4 bg-alleasy-red text-lg text-white rounded hover:bg-alleasy-blue">
                    Login
                </Button>

            </form>
        </div>
    )
}