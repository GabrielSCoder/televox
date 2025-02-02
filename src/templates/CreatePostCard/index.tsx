import { useForm } from "react-hook-form"
import Button from "../../components/Button"
import TitleTag from "../../components/TitleTags"
import { Input } from "../../components/Inputs"
import Card from "../../components/Card"

export default function CreatePostCard() {

    const { register, handleSubmit } = useForm()

    return (
        <Card classes="flex-col gap-2 p-4">

            <Card classes="justify-start items-center gap-4">
                <div className="bg-red-500 rounded-full p-4"></div>
                <TitleTag.Sub>User234580</TitleTag.Sub>
            </Card>

            <Card classes="flex-col gap-2">
                <Input.TextArea name="msg" placeholder="Your message here..." register={register} columns={100} rows={5} classes="w-full pl-2" />

                <Card classes="justify-end ">
                    <Button text="Submit" onClick={() => { }} type="submitt" />
                </Card>
            </Card>

        </Card>

    )
}