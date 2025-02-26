import { useForm } from "react-hook-form"
import Button from "../../components/Button"
import TitleTag from "../../components/TitleTags"
import { Input } from "../../components/Inputs"
import Card from "../../components/Card"
import { sendPostAsync } from "../../services/post"
import { useState } from "react"
import LoadingPageTemplate from "../LoadingPage"

type props = {
    userData : any
}

export default function CreatePostCard(props : props) {

    const { userData} = props

    const { register, handleSubmit, reset } = useForm()
    const [loading, setLoading] = useState(false)

    const handlePost = async () => {
        handleSubmit(async data => {
            const resp = await sendPostAsync({tipo : "feed", conteudo : data.message, usuario_id : userData.id})
            if (resp.data.success) {
                console.log(resp)
                reset()
            }
        })()
    }

    const delayPost = async () => {
        setLoading(true)
        const delay = new Promise(resolve => setTimeout(resolve, 2000))
        await Promise.all([delay, handlePost()])
        setLoading(false)
    }


    if (loading) {
        return <LoadingPageTemplate className="w-full"/>
    }


    return (
        <Card className="flex-col gap-2 p-4">

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

            <Card className="flex-col gap-2">
                <Input.TextArea name="message" placeholder="Your message here..." register={register} columns={100} rows={5} className="w-full pl-2" />

                <Card className="justify-end ">
                    <Button text="Submit" onClick={delayPost} type="submitt" />
                </Card>
            </Card>

        </Card>

    )
}