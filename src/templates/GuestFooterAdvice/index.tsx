import { useState } from "react"
import classNames from "../../utils/classNames"
import LoginModal from "../LoginModal"

export function GuestFooterAdvice() {

    const [loginModal, setLoginModal] = useState(false)

    return (
        <div className={classNames("sticky bottom-0 bg-sky-500 h-[70px] flex justify-center ", loginModal ? "w-[100vw]" : "w-full")}>
            <div className="flex items-center justify-between gap-72 ml-16">
                <div className="text-left">
                    <h2 className="text-white text-2xl">Não perca o que está acontecendo</h2>
                    <h3 className="text-white text-lg">Entre no televox</h3>
                </div>
                <div className="flex gap-4 justify-center items-center">
                    <input type="button" value="Entrar" className="border border-slate-100 text-white font-bold text-lg rounded-3xl h-[38px] w-[80px] py-1  hover:bg-sky-400 hover:cursor-pointer"
                        onClick={() => setLoginModal(!loginModal)}
                    />
                    <input type="button" value="Criar conta" className="text-black font-semibold text-lg bg-white rounded-3xl w-[128px] h-[38px] py-1  hover:bg-slate-100 hover:cursor-pointer" />
                </div>
            </div>
            <LoginModal state={loginModal} stateMng={setLoginModal} title="Teste" cancelText="Cancelar" confirmText="Confirmar" alertType="success" ><></></LoginModal>
        </div>
    )
}