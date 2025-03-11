import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Card from "../../components/Card";
import { Input } from "../../components/Inputs";

type props = {
    state : boolean
    setState : any
}

export default function ProfileEditModal(props : props) {

    const {setState, state} = props

    return (


        <Dialog.Root open={state} onOpenChange={setState}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-custom-bg-x data-[state=open]:animate-overlayShow" />
                <Dialog.Content
                    className={contentStyle}
                >
                    <Input.Title>Edit Profile</Input.Title>
                    <div className="w-full rounded-3xl">
                        <p>Url de imagem de fundo</p>
                        <input type="text" className="outline-none" />
                    </div>

                    <Dialog.Close asChild>
                        <button
                            className="absolute left-2.5 top-2.5 inline-flex size-[26px] appearance-none items-center justify-center rounded-full text-white hover:bg-custom-bg-x hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                            aria-label="Close"
                            onClick={}
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}