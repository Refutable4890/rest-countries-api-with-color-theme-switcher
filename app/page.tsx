"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import CountryCard from "@/app/ui/CountryCard"
import { getRestCountriesEndPoint } from "@/app/lib/apiHelper"
import { Menu } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import Search from "@/app/ui/search"
import {
  QUERY_PARAMETER_KEY_FOR_REGION,
  QUERY_PARAMETER_KEY_FOR_SEARCH,
} from "@/app/lib/config"

export interface Country {
  name: {
    official: string
    nativeName?: Record<string, { official: string; common: string }>
    common: string
  }
  cca3: string
  capital?: string[]
  population: number
  region: string
  subregion: string
  flags: {
    png: string
    svg: string
    alt: string
  }
  languages?: Record<string, string>
  tld: string[]
  currencies?: Record<string, { name: string; symbol: string }>
  borders?: string[]
}

type RegionFilterType =
  | "all"
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania"

const filterOptions: { value: RegionFilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
]

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [regionFilterValue, setRegionFilterValue] = useState<RegionFilterType>(
    () => {
      const regionFilterValueFromSearchParams = searchParams.get(
        QUERY_PARAMETER_KEY_FOR_REGION,
      )

      if (
        regionFilterValueFromSearchParams !== "Africa" &&
        regionFilterValueFromSearchParams !== "Americas" &&
        regionFilterValueFromSearchParams !== "Asia" &&
        regionFilterValueFromSearchParams !== "Europe" &&
        regionFilterValueFromSearchParams !== "Oceania"
      ) {
        return "all"
      }

      return regionFilterValueFromSearchParams
    },
  )
  const [isSearching, setIsSearching] = useState(false)
  const [countriesOfSearchResult, setCountriesOfSearchResult] = useState<
    Country[]
  >([])

  const searchRequestAbortController = useRef<AbortController | undefined>()

  const query = searchParams.get(QUERY_PARAMETER_KEY_FOR_SEARCH) || ""

  // Search.

  useEffect(() => {
    searchCountry(query)
  }, [query])

  // Update URL with region query parameter

  useEffect(() => {
    const currentURLSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    ) // -> has to use this form

    if (!regionFilterValue || regionFilterValue === "all") {
      currentURLSearchParams.delete(QUERY_PARAMETER_KEY_FOR_REGION)
    } else {
      currentURLSearchParams.set(
        QUERY_PARAMETER_KEY_FOR_REGION,
        regionFilterValue,
      )
    }

    const newUrlSearchParams = currentURLSearchParams.toString()
    const queryString = newUrlSearchParams || ""
    router.replace(`${pathname}?${queryString}`)
  }, [regionFilterValue])

  function searchCountry(keyWord: string | undefined) {
    setIsSearching(true)

    const keyWordTrimmed = keyWord?.trim()

    // ⬇️ Request to REST Countries

    if (searchRequestAbortController.current)
      searchRequestAbortController.current.abort()
    searchRequestAbortController.current = new AbortController()

    const endPointURL = getRestCountriesEndPoint(
      keyWordTrimmed
        ? {
            searchBy: "name",
            keyWord: keyWordTrimmed,
          }
        : { searchBy: "all" },
    )

    axios
      .get(endPointURL, {
        signal: searchRequestAbortController.current.signal,
      })
      .then((res) => {
        setCountriesOfSearchResult(res.data)
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setCountriesOfSearchResult([])
          console.warn(error.response.status)
        } else if (error.code === "ERR_CANCELED") {
          console.log("Cancelled request")
        } else {
          console.error(error)
        }
      })
      .finally(() => {
        setIsSearching(false)
      })

    // ⬆️ Request to REST Countries
  }

  const countriesFiltered =
    regionFilterValue === "all"
      ? countriesOfSearchResult
      : countriesOfSearchResult.filter(
          (country) => country.region === regionFilterValue,
        )

  return (
    <div className="px-4 md:px-[80px]">
      <section className="mx-auto max-w-[1280px] py-11 text-sm">
        <header className="flex flex-col justify-between gap-12 md:h-[56px] md:flex-row md:gap-x-4">
          <Search
            placeholder="Search for a country…"
            isSearching={isSearching}
          />

          <Menu
            as="div"
            className="relative max-w-[200px] grow rounded bg-white shadow dark:bg-Dark-Blue-(Dark-Mode-Elements)"
          >
            <Menu.Button className="flex h-full w-full items-center justify-between gap-x-2 whitespace-nowrap px-6 py-4">
              Filter By Region
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Menu.Items className="absolute z-50 mt-2 flex w-full origin-top-right flex-col rounded bg-white py-5 shadow dark:bg-Dark-Blue-(Dark-Mode-Elements)">
              {filterOptions.map((option) => (
                <Menu.Item key={option.value}>
                  <button
                    onClick={() => {
                      setRegionFilterValue(option.value)
                    }}
                    className={`flex justify-between px-6 py-2 text-left hover:bg-very-light-gray dark:hover:bg-Very-Dark-Blue-(Dark-Mode-Background) `}
                  >
                    {option.label}
                    {option.value === regionFilterValue && (
                      <CheckIcon className="h-5" />
                    )}
                  </button>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </header>

        {countriesFiltered.length === 0 ? (
          <div className="mt-10 md:mt-[3.75rem]">
            <p>No matches</p>
          </div>
        ) : (
          <section className="mt-10 grid grid-cols-[repeat(auto-fit,265px)] justify-around gap-[73px] md:mt-[3.75rem]">
            {countriesFiltered.map((country) => (
              <CountryCard key={country.name.official} country={country} />
            ))}
          </section>
        )}
      </section>
    </div>
  )
}
