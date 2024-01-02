"use client"

import { useContext } from "react"
import { ThemeContext } from "@/app/contexts/ThemeContextProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function Header({ className }: { className?: string }) {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <header className={className}>
      <div className="px-4 dark:bg-Dark-Blue-(Dark-Mode-Elements) dark:text-white md:px-[80px]">
        <div className="mx-auto flex max-w-[1280px] justify-between font-bold">
          <h1 className="py-6 text-xl">
            <Link href="/">Where in the world?</Link>
          </h1>

          <button
            onClick={() => {
              setTheme((theme) => (theme === "dark" ? "light" : "dark"))
            }}
          >
            {theme === "dark" && (
              <>
                <FontAwesomeIcon className="mr-2" icon={faMoon} />
                Dark Mode
              </>
            )}
            {theme === "light" && (
              <>
                <FontAwesomeIcon className="mr-2" icon={faSun} />
                Light Mode
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
