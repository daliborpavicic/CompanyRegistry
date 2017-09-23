module Request.Place exposing (..)

import Data.Place as Place exposing (Place, PlaceId)
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Request.Helpers exposing (apiUrl)

fetchPlaces : Http.Request (List Place)
fetchPlaces =
    Decode.list Place.decoder
        |> Http.get (apiUrl "/places")

fetchPlaceById : PlaceId -> Http.Request Place
fetchPlaceById id =
    Http.get (apiUrl ("/places/" ++ id)) Place.decoder

savePlace : Place -> Http.Request Place
savePlace place =
  let
    url = (apiUrl ("/places"))
    jsonBody = Http.stringBody "application/json" (Encode.encode 0 (Place.encoder place))
  in
    Http.post url jsonBody Place.decoder

deletePlace : PlaceId -> Http.Request Place
deletePlace id =
    Http.request
        { method = "DELETE"
        , headers = []
        , url = apiUrl ("/places/" ++ id)
        , body = Http.emptyBody
        , expect = Http.expectJson Place.decoder
        , timeout = Nothing
        , withCredentials = False
        }