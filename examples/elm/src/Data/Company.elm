module Data.Company exposing (..)

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode

type alias CompanyId = String

type alias Company =
    { id:  CompanyId
    , pib : String
    , name : String
    , phoneNumber : String
    , email : String
    }

setId : String -> Company -> Company
setId id company =
    { company | id = id }

setPib : String -> Company -> Company
setPib pib company =
    { company | pib = pib }

setName : String -> Company -> Company
setName name company =
    { company | name = name }

setPhoneNumber: String -> Company -> Company
setPhoneNumber phoneNumber company =
    { company | phoneNumber = phoneNumber }

setEmail: String -> Company -> Company
setEmail email company =
    { company | email = email }

decoder : Decoder Company
decoder =
    Decode.map5 Company
        (Decode.field "_id" Decode.string)
        (Decode.field "pib" Decode.string)
        (Decode.field "name" Decode.string)
        (Decode.field "phoneNumber" Decode.string)
        (Decode.field "email" Decode.string)

encoder : Company -> Encode.Value
encoder company =
  Encode.object
    [ ("_id", Encode.string company.id )
    , ("pib", Encode.string company.pib)
    , ("name", Encode.string company.name)
    , ("phoneNumber", Encode.string company.name)
    , ("email", Encode.string company.name)
    ]