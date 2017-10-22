module Data.Place exposing (..)

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode

type alias PlaceId = String

type alias Place =
    { id:  PlaceId
    , postalCode : String
    , name : String
    }

setId : String -> Place -> Place
setId id place =
    { place | id = id }

setName : String -> Place -> Place
setName name place =
    { place | name = name }

setPostalCode : String -> Place -> Place
setPostalCode postalCode place =
    { place | postalCode = postalCode }

decoder : Decoder Place
decoder =
    Decode.map3 Place
        (Decode.field "_id" Decode.string)
        (Decode.field "postalCode" Decode.string)
        (Decode.field "name" Decode.string)

encoder : Place -> Encode.Value
encoder place =
  Encode.object
    [ ("_id", Encode.string place.id )
    , ("postalCode", Encode.string place.postalCode)
    , ("name", Encode.string place.name)
    ]