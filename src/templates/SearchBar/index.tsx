import { useForm } from "react-hook-form"
import { Input } from "../../components/Inputs"
import { FaMagnifyingGlass } from "react-icons/fa6";
import Card from "../../components/Card";
import useDebounce from "../../hooks/useDebounce";
import { getUserByFilter } from "../../services/user";
import ResultList from "./ResultList";
import { useState } from "react";

export default function SearchBarTemplate() {
    const [searchData, setSearchData] = useState([])
    const [state, setState] = useState(false)

    const { register } = useForm({
        defaultValues: {
            busca: ""
        }
    })

    const log = async (data: any) => {
        if (data.trim() != "") {
            const resp = await getUserByFilter({ search: data, tamanhoPagina: 5, pagina: 1 })
            if (resp.data.success) {
                setSearchData(resp.data.dados)
            }
        }

    }

    const handleDelaySearch = useDebounce(log, 500)

    return (
        <Card className="relative flex-col gap-1 w-full"
            onBlur={(e: { currentTarget: { contains: (arg0: any) => any; }; relatedTarget: any; }) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setState(false);
                }
            }}>

            <Card className="group w-full items-center border border-gray-700 focus:outline-none focus-within:border-blue-500 rounded-3xl py-2">
                <Card><FaMagnifyingGlass size={15} className="ml-4 text-white" /></Card>
                <Input.Text name="busca" register={register} placeholder="Buscar"
                    className="text-white bg-black w-full rounded-3xl px-2 focus:outline-none"
                    onChange={(e: any) => handleDelaySearch(e.target.value)} onFocus={() => setState(true)} />
            </Card>
            <ResultList data={searchData} state={state} />
        </Card>

    )
}