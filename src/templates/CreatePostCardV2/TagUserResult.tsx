import Card from "../../components/Card";
import classNames from "../../utils/classNames";

export function TagUserResult(props: { data: Array<any>, state: boolean, onSelect: (username: string) => void, className?: string, position: { top: number, left: number } }) {
    const { data, state, onSelect, className, position } = props;

    const handleSelect = (username: string) => {
        onSelect(username); 
    };

    console.log(position)

    return (
        <div
            className={classNames(
                "flex absolute flex-col w-[200px] min-h-[50px] rounded-md shadow-sm shadow-white z-10 bg-black",
                className,
                !state || data.length < 1 ? "hidden" : ""
            )}
            style={{ top: position.top, left: position.left }}
        >
            {data.map((value, index) => (
                <Card
                    key={index}
                    className="p-2 py-4 w-full items-center gap-2 hover:cursor-pointer hover:bg-gray-800"
                    click={() => handleSelect(value.username)}
                >
                    <div className="rounded-full h-[40px] w-[40px] bg-black flex items-center justify-center">
                        {!value.img_url ? (
                            <div className="w-full h-full rounded-full m-2"></div>
                        ) : (
                            <img src={value.img_url} className="h-full w-full rounded-full object-cover" />
                        )}
                    </div>
                    <Card className="flex-col">
                        <h2 className="text-white">{value.nome}</h2>
                        <h3 className="text-gray-500">@{value.username}</h3>
                    </Card>
                </Card>
            ))}
        </div>
    );
}
