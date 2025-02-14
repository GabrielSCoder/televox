import Card from "../../components/Card";
import { Input } from "../../components/Inputs";

type props = {
    register: any
}

export function SignupModalEtapaDois(props: props) {

    const { register } = props

    return (
        <Card className="flex-col w-full gap-8">
            <Input.Text register={register} name="username" placeholder="Username" className="px-2 p-4 outline-none text-white placeholder:text-gray-500 border bg-black focus:border-blue-500" />
            <Input.Text register={register} name="password" placeholder="E-mail" className="px-2 p-4 outline-none text-white placeholder:text-gray-500 border bg-black focus:border-blue-500" />
            <Input.Password name="senha" register={register} className="w-full"/>
            {/* <p className="text-red-500 text-center" hidden={!errorMsg}>{errorMsg}</p> */}
        </Card>
    )

}