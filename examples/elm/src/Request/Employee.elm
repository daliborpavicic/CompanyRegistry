module Request.Employee exposing (..)

import Data.Employee as Employee exposing (Employee, EmployeeId)
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Request.Helpers exposing (apiUrl)

fetchEmployees : Http.Request (List Employee)
fetchEmployees =
    Decode.list Employee.decoder
        |> Http.get (apiUrl "/employees")

fetchEmployeeById : EmployeeId -> Http.Request Employee
fetchEmployeeById id =
    Http.get (apiUrl ("/employees/" ++ id)) Employee.decoder

saveEmployee : Employee -> Http.Request Employee
saveEmployee employee =
  let
    url = (apiUrl ("/employees"))
    jsonBody = Http.stringBody "application/json" (Encode.encode 0 (Employee.encoder employee))
  in
    Http.post url jsonBody Employee.decoder

deleteEmployee : EmployeeId -> Http.Request Employee
deleteEmployee id =
    Http.request
        { method = "DELETE"
        , headers = []
        , url = apiUrl ("/employees/" ++ id)
        , body = Http.emptyBody
        , expect = Http.expectJson Employee.decoder
        , timeout = Nothing
        , withCredentials = False
        }