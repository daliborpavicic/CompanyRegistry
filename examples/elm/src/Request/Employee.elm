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