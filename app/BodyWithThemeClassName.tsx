"use client"

import { useContext } from "react"
import { ThemeContext } from "./contexts/ThemeContextProvider"

export default function BodyWithThemeClassName({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { theme } = useContext(ThemeContext)

  return <body className={`${theme} ${className}`}>{children}</body>
}
