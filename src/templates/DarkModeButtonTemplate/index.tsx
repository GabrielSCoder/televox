import { useEffect, useState } from "react";
import classNames from "../../utils/classNames";

type props = {
  className?: string
}

export default function DarkModeButton(props: props) {

  const [darkMode, setDarkMode] = useState(() => {

    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      return storedTheme === "dark";
    }


    return systemPrefersDark;
  });

  const { className } = props

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  return (
    <button className={classNames(className ,"p-2 bg-blue-500 hover:bg-blue-400 text-black dark:text-white rounded-md")} onClick={toggleDarkMode}>Dark</button>
  )
}