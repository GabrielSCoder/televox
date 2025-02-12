import { FakeGroups } from "../../hooks/useFakeData";

export default function Groups() {

    return (
        <div className="flex flex-col gap-2 w-full border border-gray-700 p-2 rounded-md">
            <h2 className="text-xl font-semibold text-white text-center">Groups</h2>
            <FakeGroups />
        </div>
    )
}