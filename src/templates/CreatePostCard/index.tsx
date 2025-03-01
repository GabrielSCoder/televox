import { useForm } from "react-hook-form"
import Button from "../../components/Button"
import TitleTag from "../../components/TitleTags"
import { Input } from "../../components/Inputs"
import Card from "../../components/Card"
import { sendPostAsync } from "../../services/post"
import { useState } from "react"
import LoadingPageTemplate from "../LoadingPage"
import { CountChars } from "../../components/CountChars"

type props = {
    userData: any
}

export default function CreatePostCard(props: props) {

    const { userData } = props

    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            "message": ""
        }
    })

    const charactersLimit = 150
    const [val, setVal] = useState(0)
    const [loading, setLoading] = useState(false)

    const content = watch("message")

    const handlePost = async () => {
        handleSubmit(async data => {
            // const resp = await sendPostAsync({ tipo: "feed", conteudo: data.message, usuario_id: userData.id })
            // if (resp.data.success) {
            //     console.log(resp)
            //     reset()
            // }
            console.log(data)
        })()
    }

    const delayPost = async () => {
        setLoading(true)
        const delay = new Promise(resolve => setTimeout(resolve, 2000))
        await Promise.all([delay, handlePost()])
        setLoading(false)
    }


    return (
        <Card className="flex-col gap-0 px-4 pt-2 h-[245px] max-h-[250px] w-full">

            {loading ? (
                <LoadingPageTemplate className="w-full h-[245px]" />
            ) : (
                <>
                    <Card className="justify-start items-center gap-4">
                        {userData ? (
                            <div className="rounded-full h-[60px] w-[60px] bg-purple-500 ">
                                <img src={userData.img_url} className="h-full w-full rounded-full object-cover"></img>
                            </div>)
                            : (
                                <div className="bg-red-500 rounded-full p-4"></div>
                            )}

                        <TitleTag.Sub>{userData.username}</TitleTag.Sub>
                    </Card>

                    <Card className="flex-col gap-2 ">

                        <Card>
                            <Input.TextArea name="message" placeholder="Your message here..." register={register} columns={100} rows={5} className="w-full pl-2"
                                onChange={(e: any) => setVal(e.target.value.length)} maxLength={charactersLimit + 50} />
                        </Card>

                        <p className="border-b border-gray-800"></p>

                        <Card className="justify-end items-center gap-4">
                            <CountChars data={val} max={charactersLimit} />
                            <Button text="Post" onClick={delayPost} type="submitt" disabled={content.length < 1 || val > charactersLimit} className="px-4" />
                        </Card>
                    </Card>
                </>

            )}


        </Card>

    )
}