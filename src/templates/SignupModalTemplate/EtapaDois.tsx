import Card from "../../components/Card";
import { Input } from "../../components/Inputs";

type props = {
    register: any
    control: any
    errors: any
    validUsername : boolean
    validPassword : boolean
    etapaDoisCompleta : boolean
    manageF : Function
    loadingVerify : boolean
}

export function SignupModalEtapaDois(props: props) {

    const { register, control, errors, etapaDoisCompleta, manageF, validPassword, validUsername, loadingVerify } = props

    return (
        <Card className="flex-col w-full gap-8">
            <Input.VerifyInputText register={register} name="username" placeholder="Username" errors={errors} requiredText="Campo obrigatório" Isrequired className="px-2 p-4 outline-none text-white placeholder:text-gray-500 border bg-black focus:border-blue-500" />
            <Input.Password name="senha" register={register} errors={errors} className="w-full placeholder:text-gray-600" placeholder="senha" />
            <Input.Password name="senha_confirmacao" toggled register={register} errors={errors} className="w-full placeholder:text-gray-600 select-none" placeholder="confirme a senha" onCopy={(e) => e.preventDefault()} onCut={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} />
            <div className="flex gap-0">
                <Input.CheckBox name="termos" label="Você está de acordo com o uso de cookies" control={control} labelStyle="dark:text-white text-black text-sm" />
            </div>
            <Card className="flex-col w-full gap-6 mt-1">
                <button className="bg-black dark:bg-white dark:text-black text-white text-base rounded-3xl py-1 hover:bg-gray-200 font-semibold h-[36px] disabled:bg-gray-500" disabled={!validPassword || !etapaDoisCompleta || !validUsername || loadingVerify} onClick={() => manageF(2)}>Avançar</button>
            </Card>

        </Card>
    )

}