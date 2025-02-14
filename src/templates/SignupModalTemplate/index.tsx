import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import Card from "../../components/Card"
import { modalProps } from "../../components/Dialog Alert"
import { Input } from "../../components/Inputs"
import useDebounce from "../../hooks/useDebounce";
import { SignupModalEtapaUm } from "./EtapaUm";
import { SignupModalEtapaDois } from "./EtapaDois";
import { verifyEmail } from "../../services/user";

const contentStyle = "p-8 px-36 fixed left-1/2 top-1/2 h-[68vh] max-h-[100vh] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow"

export default function SignupModalTemplate(props: modalProps) {

    const { stateMng, state } = props
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string>()
    const [etapaUm, setEtapaUm] = useState(true)
    const [etapaDois, setEtapaDois] = useState(false)
    const [etapaConcluida, setEtapaConcluida] = useState(false)

    const nav = useNavigate()

    const { register, handleSubmit, reset, watch, getValues, control, formState : {errors}, setError, clearErrors } = useForm({
        defaultValues: {
            nome: "",
            username: "",
            data_nascimento: "",
            email: "",
            genero: "",
            senha: "",
            errorMsg: ""
        }
    })

    const onSub = () => {
        handleSubmit(data => {
            console.log(data)
        })()
    }

    const handleVerifyEmail = async () => {
        const resp = await verifyEmail({email : getValues("email")})
    }

    const handleVerifyDebounce = useDebounce(handleVerifyEmail, 2000)

    const clearErrorMsg = () => {
        setErrorMsg("")
    }

    const mapMsg = (data: any[]) => {
        const resp = data.map(item => item.menssagem)
        setErrorMsg(resp.toString())
    }

    useEffect(() => {
        if (watch("email") != "") handleVerifyDebounce()
    }, [watch("email")])


    return (

        <Dialog.Root open={state} onOpenChange={stateMng}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-custom-bg-x data-[state=open]:animate-overlayShow" />
                <Dialog.Content
                    className={contentStyle}
                    onPointerDownOutside={(e) => e.preventDefault()}>

                    <SignupModalContent loading={loading} register={register} control={control} sub={onSub} etapaUm={etapaUm} etapaDois={etapaDois} setEtapaUm={setEtapaUm} 
                    setEtapaDois={setEtapaDois} errors={errors}/>


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

function SignupModalContent(props: { loading: boolean, register: any, control : any, sub : Function, etapaUm : any, etapaDois : any, setEtapaDois : any, setEtapaUm : any, errors :any }) {

    const { loading, register, control, sub, etapaDois, etapaUm, errors } = props

    return (

        <>
            <Dialog.Title className="mt-8 text-[30px] font-medium text-mauve12 dark:text-white text-start">
                Criar sua conta
            </Dialog.Title>
            <div className="mt-8 flex flex-col justify-center items-center gap-8">

                {etapaUm && <SignupModalEtapaUm register={register} control={control} errors={errors}/>}
                {etapaUm && etapaDois && <SignupModalEtapaDois register={register}/>}

                <p className="border-b border-gray-500 w-full" />

                <Card className="flex-col w-full gap-6 mt-1">
                    <button className="bg-black dark:bg-white dark:text-black text-white text-base rounded-3xl py-1 hover:bg-gray-200 font-semibold h-[36px] disabled:bg-gray-500" onClick={() => sub()}>Avançar</button>
                </Card>

            </div>

        </>

    )
}

