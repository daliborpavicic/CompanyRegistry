module Request.Company exposing (..)

import Data.Company as Company exposing (Company, CompanyId)
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Request.Helpers exposing (apiUrl)

fetchCompanies : Http.Request (List Company)
fetchCompanies =
    Decode.list Company.decoder
        |> Http.get (apiUrl "/companies")

fetchCompanyById : CompanyId -> Http.Request Company
fetchCompanyById id =
    Http.get (apiUrl ("/companies/" ++ id)) Company.decoder