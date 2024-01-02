"use client"

import Image from "next/image"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Country } from "@/app/page"
import { getRestCountriesEndPoint } from "@/app/lib/apiHelper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [country, setCountry] = useState<Country>()
  const [borderCountries, setBorderCountries] = useState<Country[]>([])

  useEffect(() => {
    const abortController = new AbortController()
    axios
      .get(
        getRestCountriesEndPoint({ searchBy: "code", keyWord: params.slug }),
        {
          signal: abortController.signal,
        },
      )
      .then((res) => {
        setCountry(res.data[0])
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          console.warn(error.response.status)
        } else if (error.code === "ERR_CANCELED") {
          console.log("Cancelled request")
        } else {
          console.error(error)
        }
      })
    return function () {
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    if (!country?.borders) return

    country.borders.forEach((borderCountryCode) => {
      axios
        .get(
          getRestCountriesEndPoint({
            searchBy: "code",
            keyWord: borderCountryCode,
          }),
        )
        .then((res) => {
          const borderCountry: Country = res.data[0]

          console.log(borderCountry)

          setBorderCountries((borderCountries) => {
            return [...borderCountries, borderCountry]
          })
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            console.warn(error.response.status)
          } else if (error.code === "ERR_CANCELED") {
            console.log("Cancelled request")
          } else {
            console.error(error)
          }
        })
    })
  }, [country])

  const borderCountryLinks = borderCountries.map((borderCountry) => {
    return (
      <Link
        href={`/countries/${borderCountry.cca3}`}
        key={borderCountry.cca3}
        className="w-fit rounded border px-4 py-1 text-sm shadow dark:border-none dark:bg-Dark-Blue-(Dark-Mode-Elements)"
      >
        {borderCountry.name.common}
      </Link>
    )
  })

  return (
    <div className="px-[30px] md:px-[80px]">
      <div className="mx-auto max-w-[1280px] py-11">
        <button
          className="rounded px-8 py-2 shadow dark:bg-Dark-Blue-(Dark-Mode-Elements)"
          onClick={() => router.back()}
        >
          <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
          Back
        </button>

        {country && (
          <section className="mt-[3.75rem] flex flex-col items-center justify-between md:mt-20 md:flex-row md:gap-x-6">
            <div className="relative h-[230px] w-full md:h-[400px] md:w-[560px] ">
              <Image
                className="object-contain"
                src={country.flags.png}
                alt={country.flags.alt}
                fill
              />
            </div>

            <div className="md:w-[595px]">
              <h2 className="mb-7 mt-10 text-2xl font-bold md:mb-10">
                {country.name.common}
              </h2>

              <div className="flex flex-col md:flex-row md:justify-between md:gap-x-4">
                <div>
                  <p>
                    <span className="font-bold">Native Name: </span>
                    <span className="text-sm">
                      {country.name.nativeName &&
                        Object.values(country.name.nativeName)[0].common}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Population: </span>
                    <span className="text-sm">{country.population}</span>
                  </p>
                  <p>
                    <span className="font-bold">Region: </span> {country.region}
                  </p>
                  <p>
                    <span className="font-bold">Sub Region: </span>
                    <span className="text-sm">{country.subregion}</span>
                  </p>
                  <p>
                    <span className="font-bold">Capital: </span>
                    <span className="text-sm">
                      {country.capital?.join(", ")}
                    </span>
                  </p>
                </div>
                <div className="mt-12 md:my-[initial]">
                  <p>
                    <span className="font-bold">Top Level Domain: </span>
                    <span className="text-sm">{country.tld.join(" ")}</span>
                  </p>
                  <p>
                    <span className="font-bold">Currencies: </span>
                    <span className="text-sm">
                      {country.currencies &&
                        Object.values(country.currencies)
                          .map((currency) => currency.name)
                          .join(", ")}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Languages: </span>
                    <span className="text-sm">
                      {country.languages &&
                        Object.values(country.languages).join(", ")}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap items-center md:mb-4 md:mt-20">
                <section className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center">
                  <span className="mb-4 font-bold md:hidden">
                    Border Countries:{" "}
                  </span>
                  <div className="flex flex-wrap gap-2 md:items-center">
                    <span className="hidden font-bold md:inline">
                      Border Countries:{" "}
                    </span>
                    {borderCountryLinks.length > 0 ? (
                      borderCountryLinks
                    ) : (
                      <span className="text-sm">None</span>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
