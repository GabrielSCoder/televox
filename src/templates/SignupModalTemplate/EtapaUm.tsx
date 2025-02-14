import Card from "../../components/Card";
import { Input } from "../../components/Inputs";
import { SelectMain } from "../../components/Select";

type props = {
    register: any
    control: any
    errors : any
}

export function SignupModalEtapaUm(props: props) {

    const { register, control, errors } = props

    return (
        <Card className="flex-col w-full gap-8">
            <Input.Text errors={errors} register={register} name="nome" placeholder="Nome" className="px-2 h-[56px] outline-none text-white placeholder:text-gray-500 border bg-black focus:border-blue-500" />
            <Input.Text errors={errors} register={register} name="email" placeholder="E-mail" className="px-2 h-[56px] outline-none text-white placeholder:text-gray-500 border bg-black focus:border-blue-500" />
            <Input.SelectOpt control={control} name="genero" />
            <Card className="flex-col gap-2">
                <h3 className="text-base text-black dark:text-white text-start">Data nascimento</h3>
                <input type="date" {...register("data_nascimento")} className="text-center px-2 h-[56px] outline-none text-white placeholder:text-gray-500 border bg-black focus:border-blue-500 rounded-md" />
            </Card>
            {/* <p className="text-red-500 text-center" hidden={!errorMsg}>{errorMsg}</p> */}
        </Card>
    )

}