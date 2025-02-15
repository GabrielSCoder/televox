import classNames from "../../utils/classNames";

export default function TextVerifyInput(props : {register: any, disabled?: any, maxLength?: any, errors?: any, placeholder?: any, className?: any, name: any}) {

    const { register, disabled, maxLength, errors, placeholder, className , name} = props

    return (
        <div>
            <input type="text" name={name} {...register && register(name)} disabled={disabled} maxLength={maxLength}
                className={classNames(className, " rounded-md w-full text-[15px]", errors?.[name]?.message ? "border-red-500" : "border-slate-300")} placeholder={placeholder} />
            {errors?.[name] && <p className={classNames("text-sm mt-1 text-red-500", errors?.[name]?.message == "true" && "text-green-500")}>{errors[name]?.message}</p>}
        </div>
    )
}