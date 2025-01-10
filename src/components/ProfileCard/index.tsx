type ProfileCardProps = {
    profileName: string;
    postValue: number;
    accountUser: string;
    meetText: string;
    createDate: string;
    followingValue: number;
    followersValue: number;
    backgroundUrl: string;
    ProfileAvatarUrl: string;

}


export default function ProfileCard() {

    return (
        <div className="relative flex flex-col w-full justify-start items-start bg-black border border-gray-700 shadow-md gap-2 pb-6 border-b-0">

            <div className=" w-full">
                <img src={"https://images5.alphacoders.com/135/1351278.png"} className="object-cover h-[200px] w-full z-0" />
            </div>


            <div className="mt-14 p-3 flex flex-col gap-2">
                <div className="">
                    <h2 className="text-2xl font-semibold text-white">UserFlemis</h2>
                    <h3 className="text-base font-normal text-gray-500">@User18299$</h3>
                </div>

                <div>
                    <h4 className="text-white text-base">É isso aí</h4>
                    <h5 className="text-gray-500">Joined July 2018</h5>
                </div>


                <div className="flex gap-4">
                    <div className="text-gray-500 flex gap-1">
                        <p className="text-white">141</p>
                        <p> Following</p>
                    </div>
                    <div className="text-gray-500 flex gap-1"><p className="text-white">510</p>
                        <p>Followers</p>
                    </div>
                </div>
            </div>

            <div className=" rounded-full h-[128px] w-[128px] top-32 left-4 absolute border-4 border-black overflow-hidden flex justify-center items-center">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/800px-Cat_November_2010-1a.jpg"
                    className="h-full w-full object-cover"
                />
            </div>


        </div>
    )
}