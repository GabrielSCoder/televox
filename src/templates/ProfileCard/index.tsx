import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";
import ProfileWallpaper from "../../components/ProfileWallpaper";
import TitleTag from "../../components/TitleTags";
import { profile } from "../../types/profileType";
import { formatDate } from "../../utils/dateFormat";


export default function ProfileCard(props: profile & { loggedUsername?: string }) {

    const { data_criacao, data_nascimento, img_url, nome, username, background_url, loggedUsername } = props
    const logado = window.sessionStorage.getItem("content")

    console.log(loggedUsername, username)

    return (

        <>

            <Card className="relative flex-col w-full justify-start items-start pb-6 border-b">

                <ProfileWallpaper backgroundUrl={background_url} />


                <div className="w-full flex justify-end mt-2 px-2 h-[44px]">
                    {logado == "true" && loggedUsername && loggedUsername != username ? (
                        <Button className="text-white dark:text-black dark:bg-white bg-black rounded-3xl py-0 px-4 font-semibold text-lg" text="Seguir" onClick={() => { }} />
                    ) : <p className=""></p>}
                </div>

                <div className="mt-4 p-3 px-4 flex flex-col gap-2">

                    <div>
                        <TitleTag.Main style="text-2xl font-semibold">{nome}</TitleTag.Main>
                        <TitleTag.Normal style="text-base font-normal dark:text-gray-500 text-gray-500">@{username}</TitleTag.Normal>
                    </div>

                    <div>
                        <TitleTag.Normal style="">{""}</TitleTag.Normal>
                        <TitleTag.Normal style="text-gray-500 dark:text-gray-500">Entrou em {formatDate(data_criacao)}</TitleTag.Normal>
                    </div>


                    <Card className="gap-4">
                        <div className="text-gray-500 flex gap-1">
                            <p className="dark:text-white text-black">{0}</p>
                            <p>Seguindo</p>
                        </div>
                        <div className="text-gray-500 flex gap-1">
                            <p className="dark:text-white text-black">{0}</p>
                            <p>Seguidores</p>
                        </div>
                    </Card>
                </div>

                <Avatar ProfileAvatarUrl={img_url} />

            </Card>
        </>
    )
}