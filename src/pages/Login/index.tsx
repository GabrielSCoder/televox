import { useState } from "react"
import LoginModalTemplate from "../../templates/LoginModal"

export default function Login() {

    const [loginModal, setLoginModal] = useState(false)
    const [cadastroModal, setCadastroModal] = useState(false)

    return (
        <>
            <div className="">
                <h1 className="text-6xl font-semibold dark:text-white text-black font-serif">Conheça o mundo</h1>
                <h2 className="text-3xl font-semibold font-serif mt-16 dark:text-white text-black">Inscreva-se hoje</h2>
                <input type="button" value="Criar conta" className="text-white font-semibold text-lg bg-sky-500 rounded-3xl w-[280px] py-1 h-[38px] mt-8 hover:bg-blue-500 hover:cursor-pointer" />
                {/* <p className="border-b border-gray-500 w-[280px] py-2" /> */}
                <h2 className="text-base dark:text-white text-black font-semibold font-serif mt-12">Já tem uma conta?</h2>
                <input type="button" value="Entrar" className="border border-gray-500 text-blue-500 font-bold text-lg rounded-3xl w-[280px] py-1 h-[38px] mt-4 hover:bg-blue-800 hover:cursor-pointer"
                    onClick={() => setLoginModal(true)} />
            </div>
            <LoginModalTemplate state={loginModal} stateMng={setLoginModal} title="Teste" cancelText="Cancelar" confirmText="Confirmar" alertType="success"><></></LoginModalTemplate>
        </>

    )
}