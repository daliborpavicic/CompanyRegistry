module Data.Place exposing (..)

import Json.Decode as Decode exposing (Decoder)

type alias PlaceId = String

type alias Place =
    { id:  PlaceId
    , postalCode : String
    , name : String
    }

decoder : Decoder Place
decoder =
    Decode.map3 Place
        (Decode.field "_id" Decode.string)
        (Decode.field "postalCode" Decode.string)
        (Decode.field "name" Decode.string)