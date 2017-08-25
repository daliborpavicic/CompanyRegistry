module Commands exposing (..)

import Http
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (decode, required)
import Msgs exposing (Msg(..))
import Models exposing (PlaceId, Place)

fetchPlaces : Cmd Msg
fetchPlaces =
  let
    url = fetchPlacesUrl
    request =
      Http.get url placesDecoder
  in
    Http.send OnFetchPlaces request

fetchPlacesUrl : String
fetchPlacesUrl =
  "https://api.mongolab.com/api/1/databases/angulardb/collections/places?apiKey=ibGX1jtg9reXu0NcrrLwLuv5jpiUULnw"

fetchPlaceUrl : PlaceId -> String
fetchPlaceUrl id =
  "https://api.mongolab.com/api/1/databases/angulardb/collections/places/" ++ id ++ "?apiKey=ibGX1jtg9reXu0NcrrLwLuv5jpiUULnw"

fetchPlace : PlaceId -> Cmd Msg
fetchPlace id =
  let
    url = fetchPlaceUrl id
    request =
      Http.get url placeDecoder
  in
    Http.send OnFetchPlace request

placesDecoder : Decode.Decoder (List Place)
placesDecoder =
  Decode.list placeDecoder

placeDecoder : Decode.Decoder Place
placeDecoder =
  decode Place
    |> required "_id" Decode.string
    |> required "postalCode" Decode.string
    |> required "name" Decode.string