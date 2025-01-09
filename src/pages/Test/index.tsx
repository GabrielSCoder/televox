import { useForm } from "react-hook-form"

export default function TestMsg() {

    const { register, handleSubmit } = useForm()


    return (
        <div className="flex flex-col w-full gap-4 justify-start items-start p-4 bg-black rounded-md border border-gray-100 shadow-md">

            <div className="flex justify-center items-center gap-4 text-white">
                <div className="bg-red-500 rounded-full p-4"></div>
                <h2>User234580</h2>
            </div>

            <div>
                <textarea {...register("msg")} name="msg" placeholder=" message here" className="w-full bg-gray-800 text-gray-300 rounded-md" rows={5} cols={100} />
                <input type="button" value={"Submit"} name="Submit" className="p-2 border border-gray-300 text-white w-fit rounded-xl hover:cursor-pointer hover:bg-green-400" />
            </div>

        </div>
    )
}