import { useEffect, useState } from "react"
import classNames from "../../utils/classNames"

type props = {
    className?: string
}

type inputProps = {
    name: string
    register?: any
    placeholder?: string
    maxLenght: number
    value?: string
    required?: boolean
    useWatch ?: any
    control ? : any
}


function FixedInput() {
    return (
        <></>
    )
}

const textInput = (props: props & inputProps) => {

    const { className, name, register, placeholder, maxLenght, required, value = "", useWatch, control } = props

    const inputValue = useWatch ? useWatch({control, name}) : "";

    return (
        <div className={classNames("w-full border group rounded-md", required && inputValue.length == 0 ? "border-red-500 focus-within:border-red-500" : "border-gray-300 focus-within:border-blue-500")}>
            <div className="px-2 flex justify-between">
                <p className={classNames("text-gray-500 transition-colors ", required && inputValue.length == 0 ? " group-focus-within:text-red-500" : "group-focus-within:text-blue-500")}>{placeholder}</p>
                <p className={classNames("text-gray-500 transition-colors ", required && inputValue.length == 0 ? " group-focus-within:text-red-500" : "group-focus-within:text-blue-500")}>{inputValue.length} / {maxLenght}</p>
            </div>
            <input type="text" className={classNames("w-full focus:outline-none bg-transparent text-black dark:text-white p-2")} placeholder={placeholder} maxLength={maxLenght}
                {...(register ? register(name) : {})} />
                
        </div>
    )
}

const textareaInput = (props: props & inputProps) => {


    const { className, name, register, placeholder, maxLenght, value = "" } = props
    const [inputSize, setInputSize] = useState(value.length)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputSize(e.target.value.length);
    };


    return (
        <div className="w-full border border-gray-300 group focus-within:border-blue-500 rounded-md">
            <div className="px-2 flex justify-between">
                <p className="text-gray-500 transition-colors group-focus-within:text-blue-500">{placeholder}</p>
                <p className="text-gray-500 text-right transition-colors group-focus-within:text-blue-500">{inputSize} / {maxLenght}</p>
            </div>
            <textarea className="w-full focus:outline-none bg-transparent text-black dark:text-white resize-none p-2" placeholder={placeholder}
                maxLength={maxLenght} defaultValue={value} {...(register
                    ? register(name, { onChange: (e: any) => handleChange(e) }) 
                    : { onChange: handleChange }) 
                } />
        </div>
    )
}

FixedInput.InputText = textInput
FixedInput.TextArea = textareaInput

export default FixedInput