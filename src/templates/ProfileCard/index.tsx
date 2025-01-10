import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";
import ProfileWallpaper from "../../components/ProfileWallpaper";
import TitleTag from "../../components/TitleTags";

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


export default function ProfileCard({ props }: { props: ProfileCardProps }) {

    const { ProfileAvatarUrl, accountUser, backgroundUrl, createDate, followersValue, followingValue, meetText, postValue, profileName } = props

    return (
       
        <>

            <Card classes="relative flex-col w-full justify-start items-start pb-6 border-b">

                <ProfileWallpaper backgroundUrl={backgroundUrl} />

                <div className="w-full flex justify-end mt-2 px-2">
                    <Button className="text-white dark:text-black dark:bg-white bg-black rounded-3xl p-2 px-4 font-semibold text-lg" text="Seguir" onClick={() => {}} />
                </div>


                <div className="mt-4 p-3 px-4 flex flex-col gap-2">

                    <div>
                        <TitleTag.Main style="text-2xl font-semibold">{profileName}</TitleTag.Main>
                        <TitleTag.Normal style="text-base font-normal dark:text-gray-500 text-gray-500">{accountUser}</TitleTag.Normal>
                    </div>

                    <div>
                        <TitleTag.Normal style="">{meetText}</TitleTag.Normal>
                        <TitleTag.Normal style="text-gray-500 dark:text-gray-500">Joined {createDate}</TitleTag.Normal>
                    </div>


                    <Card classes="gap-4">
                        <div className="text-gray-500 flex gap-1">
                            <p className="dark:text-white text-black">{followingValue}</p>
                            <p> Following</p>
                        </div>
                        <div className="text-gray-500 flex gap-1">
                            <p className="dark:text-white text-black">{followersValue}</p>
                            <p>Followers</p>
                        </div>
                    </Card>
                </div>

                <Avatar ProfileAvatarUrl={ProfileAvatarUrl}/>

            </Card>
        </>
    )
}