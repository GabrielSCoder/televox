import DatePicker from "react-datepicker";
import Card from "../../components/Card";
import { Input } from "../../components/Inputs";
import { SelectMain } from "../../components/Select";

type props = {
    register: any
    control: any
    errors: any
    manageF : Function
    validEmail : boolean
    etapaUmCompleta : boolean
    loadingVerify : boolean
}

export function SignupModalEtapaUm(props: props) {

    const { register, control, errors, manageF, etapaUmCompleta, validEmail, loadingVerify } = props

    return (
        <Card className="flex-col w-full gap-8">
            <Input.Text errors={errors} register={register} name="nome" Isrequired requiredText={"Campo obrigatório"} placeholder="Nome" className="px-2 h-[56px] outline-none text-white placeholder:text-gray-500 border bg-black focus:border-blue-500" />
            <Input.VerifyInputText name="email" register={register} Isrequired requiredText={"Campo obrigatório"} placeholder="E-mail" errors={errors} className="px-2 h-[56px] outline-none text-white  placeholder:text-gray-500 border bg-black focus:border-blue-500" />
            <Input.SelectOpt control={control} name="genero" isRequired requiredText={"Campo obrigatório"} />
            <div className="">
                <h3 className="text-base text-black dark:text-white text-start">Data nascimento</h3>
                <Input.Date name="data_nascimento" control={control} Isrequired requiredText={"Campo obrigatório"} />
            </div>
            <p className="border-b border-gray-500 w-full" />
            <Card className="flex-col w-full gap-6 mt-1">
                <button className="bg-black dark:bg-white dark:text-black text-white text-base rounded-3xl py-1 hover:bg-gray-200 font-semibold h-[36px] disabled:bg-gray-500" disabled={!validEmail || !etapaUmCompleta || loadingVerify} onClick={() => manageF(1)}>Avançar</button>
            </Card>
        </Card>
    )

}