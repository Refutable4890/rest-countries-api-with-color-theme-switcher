export type RestCountriesSearchBy =
  | { searchBy: "all" }
  | { searchBy: "name"; keyWord: string }
  | { searchBy: "code"; keyWord: string }

export function getRestCountriesEndPoint(
  restCountriesSearchBy: RestCountriesSearchBy,
): string {
  let endPoint = ""

  if (restCountriesSearchBy.searchBy === "all") {
    // See: https://restcountries.com/#endpoints-all
    endPoint = "https://restcountries.com/v3.1/all"
  } else if (restCountriesSearchBy.searchBy === "name") {
    // See: https://restcountries.com/#endpoints-name
    endPoint = `https://restcountries.com/v3.1/name/${restCountriesSearchBy.keyWord}`
  } else if (restCountriesSearchBy.searchBy === "code") {
    // See: https://restcountries.com/#endpoints-code
    endPoint = `https://restcountries.com/v3.1/alpha/${restCountriesSearchBy.keyWord}`
  }

  return endPoint
}
