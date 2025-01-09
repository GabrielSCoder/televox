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
        <div className="relative flex flex-col w-full justify-start items-start bg-black rounded-md border border-gray-100 shadow-md">

            <div className=" w-full">
                <img src={"https://images5.alphacoders.com/135/1351278.png"} className="object-cover h-[200px] w-full z-0" />
            </div>


            <div className="mt-14 p-3">
                <div className="">
                    <h2 className="text-2xl font-semibold text-white">UserFlemis</h2>
                    <h3 className="text-base font-normal text-gray-500">@User18299$</h3>
                    <h4 className="text-white text-lg">É isso aí</h4>
                    <h5 className="text-gray-500">Joined July 2018</h5>
                </div>

                <div className="flex gap-4">
                    <div className="text-gray-500 flex"><p className="text-white">141</p> Following</div>
                    <div className="text-gray-500 flex"><p className="text-white">510</p> Followers</div>
                </div>
            </div>
            
            <div className="absolute flex justify-center items-center gap-4 p-2 text-white top-36">
                <div className="bg-red-500 rounded-full p-12 z-10"></div>
                <div className="bg-black rounded-full p-10"></div>
                {/* <h2>User234580</h2> */}
            </div>



        </div>
    )
}