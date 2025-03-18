import Button from "../../components/Button"
import Card from "../../components/Card"
import { CountChars } from "../../components/CountChars"
import { useState } from "react"
import { Input } from "../../components/Inputs"

type props = {
    userData: any
    profileData: any
    handleReply: Function
    postData: any
    register : any
}


export default function ReplyCardTemplate(props: props) {

    const { userData, handleReply, postData, register } = props
    const [isFocused, setIsFocused] = useState(false);
    const [val, setVal] = useState(0)

    const charactersLimit = 150
    const charactersBuffer = 50

    return (

        <>
            <div className="flex gap-2 px-4 py-2">
                <div className="rounded-full h-[40px] w-[40px] bg-purple-500 ">
                    {!userData.img_url ? <div className="w-full h-full rounded-full bg-red-500 m-2"></div> : <img src={userData.img_url} className="h-full w-full rounded-full object-cover"></img>}
                </div>
                <Input.TextArea name="message" className="hover:outline-none text-white placeholder:text-black placeholder:dark:text-gray-500 bg-black outline-none w-full
                    placeholder:text-left leading-[2rem]" register={register}
                    rows={6} placeholder={isFocused ? "" : "Comente..."} onChange={(e: any) => setVal(e.target.value.length)} maxLength={charactersLimit + charactersBuffer} onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)} />
            </div>

            <Card className="justify-end items-center gap-4">
                <CountChars data={val} max={charactersLimit} />
                <Button text="Reply" onClick={() => handleReply({ parent_id: postData.id, usuario_id: userData.id })} type="submitt" disabled={val < 1 || val > charactersLimit} className="px-4" />
            </Card>
        </>



    )
}