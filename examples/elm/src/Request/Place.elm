module Request.Place exposing (..)

import Data.Place as Place exposing (Place, PlaceId)
import Http
import Json.Decode as Decode
import Request.Helpers exposing (apiUrl)

fetchPlaces : Http.Request (List Place)
fetchPlaces =
    Decode.list Place.decoder
        |> Http.get (apiUrl "/places")

fetchPlaceById : PlaceId -> Http.Request Place
fetchPlaceById id =
    Http.get (apiUrl ("/places" ++ id)) Place.decoder


