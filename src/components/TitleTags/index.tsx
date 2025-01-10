import { ReactNode } from "react";
import classNames from "../../utils/classNames";

type mainProps = {
    style?: string;
    children : ReactNode;
}


function TitleTag() {

    return (
        <>
        </>
    )
}

const Main = ({ style, children }: mainProps) => {
    return <h1 className={classNames("text-2xl font-bold dark:text-neutral-200 text-black", style)}>{children}</h1>
}

const Sub = ({ style, children }: mainProps) => {
    return <h2 className={classNames("text-xl font-medium dark:text-neutral-200 text-black", style)}>{children}</h2>
}

const Normal = ({ style, children }: mainProps) => {
    return <h3 className={classNames("text-sm dark:text-neutral-200 text-black", style)}>{children}</h3>
}

const Paragraph = ({ style, children }: mainProps) => {
    return <p className={classNames("dark:text-neutral-200 text-black text-base", style)}>{children}</p>
}

TitleTag.Main = Main;
TitleTag.Sub = Sub;
TitleTag.Normal = Normal;
TitleTag.Parag = Paragraph;

export default TitleTag