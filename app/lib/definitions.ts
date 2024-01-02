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