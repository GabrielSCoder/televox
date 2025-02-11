import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { modalProps } from "../../components/Dialog Alert";
import { Input } from "../../components/Inputs";
import Card from "../../components/Card";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const contentStyle = "p-8 px-36 fixed left-1/2 top-1/2 h-[68vh] max-h-[100vh] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow"

export default function LoginModal(props: modalProps) {

    const { stateMng, state } = props
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string>()
    const { tipo_usuario, login, logado } = useAuth()
    const nav = useNavigate()

    const { register, handleSubmit, getValues } = useForm({
        defaultValues: {
            email: "",
            senha: "",
            errorMsg: ""
        }
    })

    const clearErrorMsg = () => {
        setErrorMsg("")
    }

    const submit = async () => {
        setLoading(true)
        console.log(tipo_usuario)
        handleSubmit(async (data) => {
            const resp = await login(data)
            console.log(resp)
            if (!resp.success) {
                mapMsg(resp.msg)
                console.log(resp)
            } else {
                clearErrorMsg()
                nav("/test")
            }

        })()
        setInterval(() => setLoading(false), 1000)
    }

    const mapMsg = (data: any[]) => {
        const resp = data.map(item => item.menssagem)
        setErrorMsg(resp.toString())
    }

    const loadContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <AiOutlineLoading3Quarters className="text-blue-500 animate-spin" size={30} />
                </div>
            )
        } else {
            return (
                <>
                    <Dialog.Title className="mt-8 text-[30px] font-medium text-mauve12 dark:text-white text-start">
                        Entre no televox
                    </Dialog.Title>
                    <div className="mt-8 flex flex-col justify-center items-center gap-8">

                        <div className="flex flex-col gap-4 w-full">
                            <Input.Text register={register} name="email" placeholder="E-mail" className="px-2 p-4 outline-none text-white placeholder:text-gray-500 border bg-black focus:border-blue-500" />
                            <Input.Text register={register} name="senha" placeholder="Senha" className="px-2 p-4 outline-none text-white placeholder:text-gray-500 border bg-black focus:border-blue-500" />
                            <p className="text-red-500 text-center" hidden={!errorMsg}>{errorMsg}</p>
                        </div>

                        <p className="border-b border-gray-500 w-full" />

                        <Card classes="flex-col w-full gap-6 mt-1">
                            <button className="bg-black dark:bg-white dark:text-black text-white text-base rounded-3xl py-1 hover:bg-gray-200 font-semibold h-[36px] disabled:bg-gray-500" onClick={submit}>Login</button>
                            <button className="text-black dark:text-white text-base border rounded-3xl py-1 hover:bg-custom-bg-x font-semibold h-[36px]">Esqueceu sua senha?</button>
                        </Card>

                        <div className="m-4">
                            <h3 className="text-gray-500 ">Não tem uma conta? <a href="/blank" className="text-blue-500 hover:underline hover:decoration-blue-500">Inscreva-se</a></h3>
                        </div>

                    </div>

                    <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 outline-none outline-offset-1 hover:bg-green5 focus-visible:outline-2 focus-visible:outline-green6 select-none">
                                Save changes
                            </button>
                        </Dialog.Close>
                    </div>
                </>

            )
        }
    }

    useEffect(() => {
        setErrorMsg("")
    }, [state])


    return (

        <Dialog.Root open={state} onOpenChange={stateMng}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-custom-bg-x data-[state=open]:animate-overlayShow" />
                <Dialog.Content
                    className={contentStyle}
                    onPointerDownOutside={(e) => e.preventDefault()}>

                    {loadContent()}
                    <Dialog.Close asChild>
                        <button
                            className="absolute left-2.5 top-2.5 inline-flex size-[26px] appearance-none items-center justify-center rounded-full text-white hover:bg-custom-bg-x hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                            aria-label="Close"
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}