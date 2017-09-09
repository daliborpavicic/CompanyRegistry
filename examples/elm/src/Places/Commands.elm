module Places.Commands exposing (..)

import Json.Decode as Decode
import Json.Encode as Encode
import Http exposing (..)
import Places.Models exposing (Place)
import Places.Messages exposing (Msg(..))

setPostalCode : Place -> String -> Place
setPostalCode place postalCode =
    { place | postalCode = postalCode }

setName : Place -> String -> Place
setName place placeName =
    { place | name = placeName }

placeDecoder : Decode.Decoder Place
placeDecoder =
  Decode.map3 Place
    (Decode.field "_id" Decode.string)
    (Decode.field "postalCode" Decode.string)
    (Decode.field "name" Decode.string)

placeEncoder : Place -> Encode.Value
placeEncoder place =
  Encode.object
    [ ("_id", Encode.string place.id )
    , ("postalCode", Encode.string place.postalCode)
    , ("name", Encode.string place.name)
    ]

collectionUrl : String
collectionUrl =
  "https://api.mongolab.com/api/1/databases/angulardb/collections/places"

placesUrl : String
placesUrl =
  withApiKey collectionUrl

placeUrl : String -> String
placeUrl placeId =
  withApiKey <| String.join "/" [ collectionUrl, placeId ]

withApiKey : String -> String
withApiKey url =
  url ++ "?apiKey=ibGX1jtg9reXu0NcrrLwLuv5jpiUULnw"

fetchPlaceById : String -> Cmd Msg
fetchPlaceById placeId =
  let
    url = placeUrl placeId
    request =
      Http.get url placeDecoder
  in
    Http.send OnFetchPlace request

submitPlace : Place -> Cmd Msg
submitPlace place =
  let
    url = placesUrl
    placeToSubmit = { place | id = place.postalCode }
    jsonBody = Http.stringBody "application/json" (Encode.encode 0 (placeEncoder placeToSubmit))
    request =
      Http.post url jsonBody placeDecoder
  in
    Http.send OnSavePlace request

deletePlaceById : String -> Cmd Msg
deletePlaceById placeId =
  let
    url = placeUrl placeId
    request =
      Http.request
        { method = "DELETE"
        , headers = []
        , url = url
        , body = Http.emptyBody
        , expect = expectJson placeDecoder
        , timeout = Nothing
        , withCredentials = False
        }
  in
    Http.send OnDeletePlace request