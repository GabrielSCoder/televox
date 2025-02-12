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


