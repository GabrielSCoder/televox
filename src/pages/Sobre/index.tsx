export default function Sobre() {
    return (
        <div className="w-full h-full grid grid-rows-2 justify-center items-center p-4 gap-8">

            <div className="row-span-1 bg-blue-800 h-full flex justify-center items-center">
                <p className="text-xl text-white text-center">O WebVox é o produto final de semanas de desenvolvimento com foco em colocar todo o conhecimento de
                    Web Developer em prática.</p>
            </div>

            {/* <p className="border border-b w-full "></p> */}

            <div className="w-full bg-orange-800 h-full flex flex-col items-center justify-center">
                <p className="text-lg text-white text-center">
                    Principais tecnologias utilizadas
                </p>

                <div className="row-span-1 text-base text-white text-center">

                    <div className="flex gap-10 items-center justify-center">

                        <ul className="text-left">
                            <li>
                                Front-End
                            </li>
                            <ul>
                                <li>React Typescript + Vite</li>
                                <li>Hook Form</li>
                                <li>Axios</li>
                                <li>TailwindCSS</li>
                                <li>Router Dom</li>
                                <li>Radix UI</li>
                            </ul>
                        </ul>

                        <ul className="text-left">
                            <li>
                                Back-End
                            </li>
                            <ul>
                                <li>NodeJs</li>
                                <li>TypeScript</li>
                                <li>Express</li>
                                <li>SocketIo</li>
                                <li>Sequelize</li>
                                <li>PostGre</li>
                                <li>JWT</li>
                            </ul>
                        </ul>
                    </div>


                </div>
            </div>



        </div>
    )
}