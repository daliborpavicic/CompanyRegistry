module Data.Employee exposing (..)

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode

type alias EmployeeId = String

type alias Employee =
    { id : EmployeeId
    , jmbg : String
    , name : String
    , surname : String
    , email : String
    }

decoder : Decoder Employee
decoder =
    Decode.map5 Employee
        (Decode.field "_id" Decode.string)
        (Decode.field "jmbg" Decode.string)
        (Decode.field "name" Decode.string)
        (Decode.field "surname" Decode.string)
        (Decode.field "email" Decode.string)

encoder : Employee -> Encode.Value
encoder employee =
  Encode.object
    [ ("_id", Encode.string employee.id)
    , ("jmbg", Encode.string employee.jmbg)
    , ("name", Encode.string employee.name)
    , ("surname", Encode.string employee.surname)
    , ("email", Encode.string employee.email)
    ]