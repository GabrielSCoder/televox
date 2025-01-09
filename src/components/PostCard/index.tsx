import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";

type cardProps = {
    title: string;
    body: string;
    likes: number;
    deslieks: number;
    shares: number;
    time? : string;
}


export default function PostCard(props: cardProps) {

    const { body, title, likes } = props

    return (
        <div className="bg-black text-xl p-4 border border-b-0 border-gray-400 text-white hover:bg-gray-950">

            <div className="flex justify-start items-center gap-2" >
                <div className="bg-purple-500 rounded-full p-4"></div>
                <h2>{title}</h2>
                <p className="text-sm text-gray-600">- 9h</p>
            </div>

            <p className="break-words text-left ml-10 text-base mb-4">{body}</p>

            <div className="flex gap-4 mt-4 justify-end">
                <h2 className="flex text-center gap-2 justify-center items-center">
                    <FaRegThumbsUp size={15} className="text-gray-400 hover:text-blue-500" />
                    <p className="text-gray-400 text-base">{likes}</p>
                </h2>
                <h2 className="flex text-center gap-2 justify-center items-center">
                    <FaRegThumbsDown size={15} className="text-gray-400 hover:text-red-500" />
                    <p className="text-gray-400 text-base">{likes}</p>
                </h2>
                <h2 className="flex text-center gap-2 justify-center items-center">
                    <CiShare2 size={15} className="text-gray-400 hover:text-green-500" />
                    <p className="text-gray-400 text-base">{likes}</p>
                </h2>


            </div>
        </div>
    )
}