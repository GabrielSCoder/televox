import { SelectMain } from "../../components/Select";


export default function GeneroSelectTemplate(props: {field : any, errors ?: any, Isrequired ?: boolean, requiredText ?: string}) {

    const { field, errors } = props

    return (
        <SelectMain placeholder="Gênero" value={field.value} onChange={field.onChange} errors={errors} >
            <SelectMain.Label>Gênero</SelectMain.Label>
            <SelectMain.Item value="masculino">Masculino</SelectMain.Item>
            <SelectMain.Item value="feminino">Feminino</SelectMain.Item>
        </SelectMain>
    )


}