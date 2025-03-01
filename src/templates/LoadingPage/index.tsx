import { AiOutlineLoading3Quarters } from "react-icons/ai";
import classNames from "../../utils/classNames";

type props = {
    className ?: string
}

export default function LoadingPageTemplate(props : props) {

    const { className } = props

    return (
        <div className={classNames("flex items-center justify-center", className)}>
            <AiOutlineLoading3Quarters className="text-blue-500 animate-spin" size={30} />
        </div>
    )
}