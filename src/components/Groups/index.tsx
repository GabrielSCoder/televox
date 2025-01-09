export default function Groups() {

    const fakeGroups = () => {
        
        let ff = []
        let temp

        for (let i = 0; i < 10; i++) {
            temp = (
                <div className="flex gap-4">
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

    return (
        <div className="flex flex-col gap-2 w-full border border-gray-700 p-2 rounded-md">
            <h2 className="text-xl font-semibold text-white text-center">Groups</h2>
            {fakeGroups()}
        </div>
    )
}