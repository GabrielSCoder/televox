import { useState, useEffect, useContext } from 'react';
import MainRouter from './router';
import { AuthProvider } from './contexts/userContext';
import ChatMK1 from './templates/ChatMK1Template';


function App() {

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


  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
    // <ChatMK1 />
  )
}

export default App
