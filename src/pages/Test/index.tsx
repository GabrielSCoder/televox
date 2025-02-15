import { useEffect, useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Verifica a preferência do sistema primeiro
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      return storedTheme === "dark";
    }

    // Se não houver no localStorage, usa a preferência do sistema
    return systemPrefersDark;
  });

  useEffect(() => {
    // Atualiza o tema no DOM e armazena no localStorage
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
    <div className="min-h-screen">
      <button
        onClick={toggleDarkMode}
        className="p-4 text-white bg-blue-500 rounded-md"
      >
        Toggle Dark Mode
      </button>
      <div className="p-4 bg-gray-100 dark:bg-gray-800 dark:text-white">
        {darkMode ? "Dark Mode Enabled" : "Light Mode Enabled"}
      </div>
    </div>
  );
}
