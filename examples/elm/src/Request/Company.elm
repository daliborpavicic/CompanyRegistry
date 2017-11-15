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

saveCompany : Company -> Http.Request Company
saveCompany company =
  let
    url = (apiUrl ("/companies"))
    jsonBody = Http.stringBody "application/json" (Encode.encode 0 (Company.encoder company))
  in
    Http.post url jsonBody Company.decoder

deleteCompany : CompanyId -> Http.Request Company
deleteCompany id =
    Http.request
        { method = "DELETE"
        , headers = []
        , url = apiUrl ("/companies/" ++ id)
        , body = Http.emptyBody
        , expect = Http.expectJson Company.decoder
        , timeout = Nothing
        , withCredentials = False
        }