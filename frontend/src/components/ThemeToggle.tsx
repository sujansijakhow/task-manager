import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition"
    >
      <div
        className={`absolute w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow transform transition ${
          dark ? "translate-x-6" : "translate-x-0"
        }`}
      />

      <div className="flex justify-between w-full px-1">
        <FiSun size={14} className="text-yellow-500" />
        <FiMoon size={14} />
      </div>
    </button>
  );
};

export default ThemeToggle;