import { loginAsync } from "../../services/auth";

export default function Test() {
  

  const log = async () => {
    const resp = await loginAsync({email : "23", senha : "123123"})
    console.log(resp)
  }

  return (
    <div className="min-h-screen h-screen w-screen flex justify-center items-center">
       <input type="button" className="text-white bg-blue-500 rounded-md p-4" onClick={() => log()} value={"CLICAR"}/>
    </div>
  );
}
