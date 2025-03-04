type props = {
    postData : any
}

export default function PostViewTemplate(props : props) {

    const {postData} = props

    return (
        <div>
            <h2 className="text-xl font-semibold text-white">{postData.conteudo}</h2>
        </div>
    )
}