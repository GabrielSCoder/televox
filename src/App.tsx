import { useState, useEffect } from 'react';
import MainRouter from './router';
import SocketProvider from './contexts/socketContext';
import { setErrorHandler } from './services/axiosConfig';
import { getIPAddress } from './services/soinformation';
import { generateHMAC } from './services/crypto';
const key = import.meta.env.VITE_SECRET_KEY


function App() {
  const info = window.localStorage.getItem("NIF") === "string"
  const [text, setText] = useState<string | null>()

  const darkMode = useState(() => {

    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      return storedTheme === "dark";
    }

    return systemPrefersDark;
  });

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    setErrorHandler((msg) => {
      return setText(msg);
    })
  }, [])

  useEffect(() => {

    const inx = async () => {
        const resp = await getIPAddress()
        const hmac = await generateHMAC(resp, key)
        window.localStorage.setItem("NIF", hmac)
    }

    if (!info) {
      inx()
    }

  }, [])

  return (
    <SocketProvider>
      <MainRouter />
      <div className='bg-red-500 absolute bottom-0 left-1/2'>
        <p className='text-white text-lg'>{text ?? ""}</p>
      </div>
    </SocketProvider>
  )
}

export default App
