import "./globals.css"
import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"
import ThemeContextProvider from "./contexts/ThemeContextProvider"
import Header from "./Header"
import BodyWithThemeClassName from "./BodyWithThemeClassName"

export const metadata: Metadata = {
  title: "Frontend Mentor - REST Countries API with color theme switcher",
}

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunitoSans.className}>
      <ThemeContextProvider>
        <BodyWithThemeClassName className="flex min-h-screen flex-col">
          <Header className="z-10 shadow" />

          <main className="grow bg-very-light-gray dark:bg-Very-Dark-Blue-(Dark-Mode-Background) dark:text-white">
            {children}
          </main>
        </BodyWithThemeClassName>
      </ThemeContextProvider>
    </html>
  )
}
