import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import classNames from "../../utils/classNames";

export default function ResultList(props: { data: Array<any>, state: boolean }) {

    const { data, state } = props
    const nav = useNavigate()

    const getRows = () => {

        const r = data.map((value, index) => (
            <Card key={index} className="p-2 py-4 w-full items-center gap-2 hover:cursor-pointer hover:bg-gray-800"  onMouseDown={() => nav("/" + value.username)}>
                <div className="rounded-full h-[40px] w-[40px] bg-black flex items-center justify-center ">
                    {!value.img_url ? <div className="w-full h-full rounded-full m-2"></div> : <img src={value.img_url} className="h-full w-full rounded-full object-cover"></img>}
                </div>
                <Card className="flex-col">
                    <h2 className="text-white">{value.nome}</h2>
                    <h3 className="text-gray-500">@{value.username}</h3>
                </Card>
            </Card>
        ))

        return r
    }

    return (
        <Card className={classNames("absolute flex-col top-full left-0 w-full min-h-[50px] rounded-md shadow-sm shadow-white z-10 bg-black", !state ? "hidden" : "")}>
            {getRows()}
        </Card>
    )
}