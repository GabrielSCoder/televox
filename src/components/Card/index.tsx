import { ReactNode } from "react";
import classNames from "../../utils/classNames";

type cardProps = {
    classes ?: string;
    children : ReactNode;
    click? : Function;
}


export default function Card({classes, children, click} : cardProps) {

    const clickC = () => {
        click ? click() : null 
    }

    return (
        <div className={classNames("flex ", classes)} onClick={clickC}>
            {children}
        </div>
    )
}