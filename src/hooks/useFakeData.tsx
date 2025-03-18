import PostCard from "../templates/PostCard"


export const fakeProfileData = {
    username : "teste sdd",
    id : 0,
    email : "gababuie dsds",
    nome: "admin",
    genero: "masculino                                                                                                                                                                                                                                                      ",
    img_url: "https://pm1.aminoapps.com/7955/b0f1e4fd0bd52b36670d59ab6b9534074fd06292r1-1080-1213v2_hq.jpg",
    data_nascimento: "01/02/1999",
    data_criacao: "2025-02-17T03:37:05.056Z"
}

export const FakeFriends = () => {

    let ff = []
    let temp

    for (let i = 0; i < 5; i++) {
        temp = (
            <div key={i} className="flex gap-4">
                <div className={`rounded-full p-4 bg-[#3738]`}></div>
                <h2 className="text-white font-semibold text-lg">{`User18299${i}`}</h2>
            </div>
        )

        ff.push(temp)
    }

    return (
        <div className="flex flex-col gap-4">
            {ff}
        </div>
    )
}

export const FakeGroups = () => {

    let ff = []
    let temp

    for (let i = 0; i < 5; i++) {
        temp = (
            <div key={i} className="flex gap-4">
                <div className={`rounded-full p-4 bg-[#3738]`}></div>
                <h2 className="text-white font-semibold text-lg">{`Grupo${i}`}</h2>
            </div>
        )

        ff.push(temp)
    }

    return (
        <div className="flex flex-col gap-4">
            {ff}
        </div>
    )
}

export const MakeFakeCards = () => {

    const cards = Array.from({ length: 10 }, (_, index) => (
       <PostCard key={index} title={"Flemis2024"} body={"DSAJKDJASLDKJASLDJALJ"} deslieks={0} likes={20} shares={9} postId={0} liked handleReaction={undefined} lockedReact={true} replies={0} data_criacao={""} />
   ))

   return cards
}


