import { CiShare2 } from "react-icons/ci";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

type reactionsProps = {
    likes : number;
    deslikes : number;
    shares : number;
}

export default  function ReactionsTemplate({props} : {props : reactionsProps}) {
    return (
        <>
            <div className="flex gap-4 mt-4 justify-end">
                <h2 className="flex text-center gap-2 justify-center items-center">
                    <FaRegThumbsUp size={15} className="text-gray-400 hover:text-blue-500" />
                    <p className="text-gray-400 text-base">{props.likes}</p>
                </h2>
                <h2 className="flex text-center gap-2 justify-center items-center">
                    <FaRegThumbsDown size={15} className="text-gray-400 hover:text-red-500" />
                    <p className="text-gray-400 text-base">{props.deslikes}</p>
                </h2>
                <h2 className="flex text-center gap-2 justify-center items-center">
                    <CiShare2 size={15} className="text-gray-400 hover:text-green-500" />
                    <p className="text-gray-400 text-base">{props.shares}</p>
                </h2>


            </div>
        </>
    )
}