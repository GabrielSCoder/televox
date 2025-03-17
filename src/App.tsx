import { useState, useEffect } from 'react';
import MainRouter from './router';
import SocketProvider from './contexts/socketContext';
import { setErrorHandler } from './services/axiosConfig';
import { getFingerPrint } from './services/fingerprint';

function App() {

  const [text, setText] = useState<string | null>()

  const [darkMode, setDarkMode] = useState(() => {

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
