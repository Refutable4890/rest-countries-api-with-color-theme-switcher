"use client"

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react"

type Theme = "light" | "dark"

interface ThemeContext {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContext>({
  theme: "light",
  setTheme: () => {},
})

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<Theme>("light")

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false

      const themeGotFromLocalStorage = localStorage.getItem("theme")
      if (
        themeGotFromLocalStorage === "dark" ||
        themeGotFromLocalStorage === "light"
      ) {
        setTheme(themeGotFromLocalStorage)
      } else {
        setTheme("light")
      }
    } else localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
