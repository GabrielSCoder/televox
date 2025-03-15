// import { CiShare2 } from "react-icons/ci";
// import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
// import { CiHeart } from "react-icons/ci";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

type reactionsProps = {
    likes: number;
    isLiked: boolean;
    handleReaction : any
    deslikes?: number;
    shares?: number;
    replies: number;
    id : number
    locked : boolean
    profileId ?: number
}

export default function ReactionsTemplate({ props }: { props: reactionsProps }) {

    const handleR = (event : React.MouseEvent) => {
        event.stopPropagation()
        props.handleReaction(props.id, props.profileId)
    }

    return (
        <>
            <div className="flex gap-4 justify-end items-center mt-1">

                <div className="group flex text-center justify-center items-center transition gap-0">
                    {props.isLiked ? (
                        <div className="p-1 rounded-full group-hover:bg-rose-900/30" onClick={handleR}>
                            <IoIosHeart size={18} className="text-rose-500 transition" />
                        </div>
                    ) : (
                        <div className="p-1 rounded-full group-hover:bg-rose-900/30" onClick={handleR}>
                            <IoIosHeartEmpty size={18} className="text-gray-400 group-hover:text-rose-500 transition" />
                        </div>
                    )}

                    <p className="text-gray-400 text-base group-hover:text-rose-700 transition">{props.likes}</p>
                </div>

                <div className="group flex text-center gap-0 justify-center items-center p-2 transition">
                    <div className="p-1 rounded-full group-hover:bg-blue-600/30">
                        <BsChat size={15} className="text-gray-400 group-hover:text-blue-500 transition" />
                    </div>
                    <p className="text-gray-400 text-base group-hover:text-blue-500 transition">{props.replies}</p>
                </div>

                {/* <h2 className="flex text-center gap-2 justify-center items-center">
                    <FaRegThumbsUp size={15} className="text-gray-400 hover:text-blue-500" />
                    <p className="text-gray-400 text-base">{props.likes}</p>
                </h2> */}
                {/* <h2 className="flex text-center gap-2 justify-center items-center">
                    <FaRegThumbsDown size={15} className="text-gray-400 hover:text-red-500" />
                    <p className="text-gray-400 text-base">{props.deslikes}</p>
                </h2> */}
                {/* <h2 className="flex text-center gap-2 justify-center items-center">
                    <CiShare2 size={15} className="text-gray-400 hover:text-green-500" />
                    <p className="text-gray-400 text-base">{props.shares}</p>
                </h2> */}



            </div>
        </>
    )
}