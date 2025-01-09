function LateralMenu () {
    const opts = ["Home", "Notifications" , "Groups", "Private Messages", "Configuration"]

    const getMenuOpts = () => {
        const list = opts.map((key, index) => (
            <button className="rounded-3xl text-xl font-semibold text-white hover:bg-slate-700 px-6 py-2">{key}</button>
        ))

        return list
    }

    return (
        <div className="flex flex-col justify-center items-center gap-8">
            {getMenuOpts()}
        </div>
    )
}

export default LateralMenu