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

setId : String -> Employee -> Employee
setId id employee =
    { employee | id = id }

setJmbg : String -> Employee -> Employee
setJmbg jmbg employee =
    { employee | jmbg = jmbg }

setName : String -> Employee -> Employee
setName name employee =
    { employee | name = name }

setSurname: String -> Employee -> Employee
setSurname surname employee =
    { employee | surname = surname }

setEmail: String -> Employee -> Employee
setEmail email employee =
    { employee | email = email }

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