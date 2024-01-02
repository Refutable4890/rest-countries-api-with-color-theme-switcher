"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { QUERY_PARAMETER_KEY_FOR_SEARCH } from "../lib/config"

export default function Search({
  placeholder,
  isSearching,
}: {
  placeholder: string
  isSearching: boolean
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback(function (term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set(QUERY_PARAMETER_KEY_FOR_SEARCH, term)
    } else {
      params.delete(QUERY_PARAMETER_KEY_FOR_SEARCH)
    }
    replace(`${pathname}?${params.toString()}`)
  }, 1000)

  return (
    <>
      {/* Search input box */}
      <div className="flex shrink rounded bg-white px-6 text-Dark-Gray-(Light-Mode-Input) shadow dark:bg-Dark-Blue-(Dark-Mode-Elements) dark:text-white md:basis-[480px]">
        {isSearching ? (
          <FontAwesomeIcon className="mr-3 self-center" icon={faSpinner} spin />
        ) : (
          <FontAwesomeIcon
            className="mr-3 self-center"
            icon={faMagnifyingGlass}
          />
        )}

        <input
          className="h-[56px] grow bg-inherit md:h-[initial] md:w-[inherit]"
          defaultValue={searchParams
            .get(QUERY_PARAMETER_KEY_FOR_SEARCH)
            ?.toString()}
          onChange={(event) => {
            handleSearch(event.target.value)
          }}
          placeholder={placeholder}
        />
      </div>
    </>
  )
}
