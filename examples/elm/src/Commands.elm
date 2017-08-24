module Commands exposing (..)

import Http
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (decode, required)
import Msgs exposing (Msg)
import Models exposing (PlaceId, Place)
import RemoteData

fetchPlaces : Cmd Msg
fetchPlaces =
  Http.get fetchPlacesUrl placesDecoder
  |> RemoteData.sendRequest
  |> Cmd.map Msgs.OnFetchPlaces

fetchPlacesUrl : String
fetchPlacesUrl =
  "https://api.mongolab.com/api/1/databases/angulardb/collections/places?apiKey=ibGX1jtg9reXu0NcrrLwLuv5jpiUULnw"

placesDecoder : Decode.Decoder (List Place)
placesDecoder =
  Decode.list placeDecoder

placeDecoder : Decode.Decoder Place
placeDecoder =
  decode Place
    |> required "_id" Decode.string
    |> required "postalCode" Decode.string
    |> required "name" Decode.string