import { useState, useEffect } from 'react';
import Test from './pages/Test'
import FeedRouter from './router'


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
    <FeedRouter />
    // <Test />

  )
}

export default App
