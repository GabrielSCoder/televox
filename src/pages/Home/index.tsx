
export default function Home() {

    return (
        <div className="flex items-start justify-between bg-black">
           <div className="bg-yellow-500 w-1/3 h-[200px] sticky top-10 overflow-auto"><h2 className="text-center">Coluna 1</h2></div>
           <div className="bg-green-500 w-1/3 h-[2000px] flex flex-col"><h2 className="text-start">Coluna 2</h2></div>
           <div className="bg-red-500 w-1/3 h-[200px] sticky top-10 overflow-auto"><h2 className="text-center">Coluna 3</h2></div>
        </div>
    )

}