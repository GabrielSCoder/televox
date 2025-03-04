type props = {
    ProfileAvatarUrl?: string
}


export default function Avatar(props: props) {

    const { ProfileAvatarUrl } = props

    return (
        <div className="rounded-full h-[128px] w-[128px] top-32 left-4 absolute border-4 border-black overflow-hidden flex justify-center items-center">
            {ProfileAvatarUrl ? (
                <img
                    src={ProfileAvatarUrl}
                    className="h-full w-full object-cover" />
            ) : (
                <div className="bg-purple-500 rounded-full h-full w-full"></div>
            )}
        </div>
    )
}