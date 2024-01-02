"use client"

import Link from "next/link"
import { Country } from "@/app/page"
import Image from "next/image"

interface Props {
  country: Country
}

export default function CountryCard({ country }: Props) {
  return (
    <Link
      className="overflow-hidden rounded  shadow dark:bg-Dark-Blue-(Dark-Mode-Elements) dark:text-white"
      href={`/countries/${country.cca3}`}
    >
      <div className="relative">
        <Image
          className="object-contain"
          src={country.flags.png}
          alt={country.flags.alt}
          height={160}
          width={265}
        />
      </div>
      <div className="px-5 pb-8 pt-4">
        <h2 className="pb-4 text-lg font-bold">{country.name.common}</h2>
        <p>
          <span className="font-bold">Population:</span> {country.population}
        </p>
        <p>
          <span className="font-bold">Region:</span> {country.region}
        </p>
        <p>
          <span className="font-bold">Capital:</span> {country.capital}
        </p>
      </div>
    </Link>
  )
}
