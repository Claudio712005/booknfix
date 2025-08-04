import useRegisterUser from "../hooks/useRegisterUser";
import { Button } from "primereact/button";
import { GenericInput } from "@/components/GenericForm/GenericInput";
import Logo from "@/components/Logo";
import { Divider } from "primereact/divider";

export const RegisterUser: React.FC = () => {
    const { register, handleSubmit, onSubmit, errors, control } = useRegisterUser();

    return (
        <div className="w-full h-screen flex ">
            <div className="hidden lg:flex w-[40%] flex-col justify-between px-14 py-10 ">
                <div>
                    <Logo size="lg" className="mb-8" />

                    <h1 className="text-3xl font-bold text-gray-800 mb-8 leading-snug">
                        Agende seus serviços com a {" "}
                        <span className="text-orange-500">Booknfix</span>
                    </h1>

                    <ul className="space-y-6 text-gray-600">
                        <li>
                            <span className="font-semibold text-gray-800 text-lg">📅 Agendamento fácil:</span>
                            <p className="text-sm">Mensagens instantâneas e seguras entre clientes e profissionais.</p>
                        </li>
                        <li>
                            <span className="font-semibold text-gray-800 text-lg">💳 Faturamento otimizado:</span>
                            <p className="text-sm">Interface simples para agendar e gerenciar atendimentos com eficiência.</p>
                        </li>
                        <li>
                            <span className="font-semibold text-gray-800 text-lg">🧑‍⚕️ Melhore os resultados:</span>
                            <p className="text-sm">Planos personalizados que melhoram a experiência do cliente.</p>
                        </li>
                    </ul>
                </div>
                <p className="mt-10 text-xs text-gray-400">© 2025 Booknfix • Privacidade & Termos</p>
            </div>

            <Divider layout="vertical" className="hidden lg:flex h-full" />

            <div className="flex flex-1 justify-center items-center px-4 sm:px-6 lg:px-12">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full  p-8"
                >
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                        Comece a usar a{" "}
                        <span className="text-orange-500 font-bold">Booknfix</span>
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Insira suas informações para criar sua conta.
                    </p>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <GenericInput
                                name="name"
                                label="Nome"
                                type="text"
                                register={register}
                                error={errors.name?.message}
                                InputTextProps={{ placeholder: "Digite seu nome" }}
                            />
                            <GenericInput
                                name="surname"
                                label="Sobrenome"
                                type="text"
                                register={register}
                                error={errors.surname?.message}
                                InputTextProps={{ placeholder: "Digite seu sobrenome" }}
                            />
                        </div>
                        <GenericInput
                            name="email"
                            label="E-mail"
                            type="email"
                            register={register}
                            error={errors.email?.message}
                            InputTextProps={{ placeholder: "Digite seu e-mail" }}
                        />
                        <GenericInput
                            name="phone"
                            label="Telefone"
                            mask="(99) 9999-9999"
                            control={control}
                            error={errors.phone?.message}
                            InputMaskProps={{ placeholder: "(99) 9999-9999" }}
                        />
                        <div className="flex flex-col sm:flex-row gap-4">
                            <GenericInput
                                name="password"
                                label="Senha"
                                type="password"
                                control={control}
                                error={errors.password?.message}
                                PasswordInputProps={{
                                    placeholder: "Digite sua senha",
                                    feedback: true,
                                    inputStyle: { width: "100%" }
                                }}
                            />
                            <GenericInput
                                name="confirmPassword"
                                label="Confirme a Senha"
                                type="password"
                                register={register}
                                error={errors.confirmPassword?.message}
                                InputTextProps={{ placeholder: "Confirme sua senha" }}
                            />
                        </div>

                        <Button
                            type="submit"
                            label="Criar minha conta"
                            className="w-full mt-4"
                            severity="warning"
                            raised
                        />

                        <p className="text-sm text-gray-500 text-center mt-3">
                            Já tem uma conta?{" "}
                            <a href="/login" className="text-orange-500 font-semibold hover:underline">
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
