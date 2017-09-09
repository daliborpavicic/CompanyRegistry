module Main exposing (..)

import Html exposing (Html, text, div, button, input, table, thead, tbody, tr, th, td, br, p)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Decode as Decode
import Json.Encode as Encode
import Http

type alias Place =
  { id:  String
  , postalCode : String
  , name : String
  }

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

collectionUrl =
  "https://api.mongolab.com/api/1/databases/angulardb/collections/places"

placesUrl =
  withApiKey collectionUrl

placeUrl placeId =
  withApiKey <| String.join "/" [ collectionUrl, placeId ]

withApiKey url =
  url ++ "?apiKey=ibGX1jtg9reXu0NcrrLwLuv5jpiUULnw"

fetchPlaceById placeId =
  let
    url = placeUrl placeId
    request =
      Http.get url placeDecoder
  in
    Http.send NewPlace request

submitPlace place =
  let
    url = placesUrl
    placeToSubmit = { place | id = place.postalCode }
    jsonBody = Http.stringBody "application/json" (Encode.encode 0 (placeEncoder placeToSubmit))
    request =
      Http.post url jsonBody Decode.string
  in
    Http.send SubmitPlace request


type alias Model =
  { editedPlace : Place
  , places : List Place
  , placeId: String
  , errorMessage: String
  }

type Msg
    = SetPostalCode String
    | SetName String
    | SavePlace Place
    | FetchPlace String
    | SetPlaceId String
    | NewPlace (Result Http.Error Place)
    | SubmitPlace (Result Http.Error String)

init : ( Model, Cmd Msg )
init =
  let
    initialModel = { editedPlace = Place "" "" "", places = [], placeId = "", errorMessage = "" }
  in
    ( initialModel, Cmd.none )

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    SetPostalCode newPostalCode ->
      let
        place = setPostalCode model.editedPlace newPostalCode
      in
        ( { model | editedPlace = place }, Cmd.none )

    SetName newName ->
      let
        place = setName model.editedPlace newName
      in
        ( { model | editedPlace = place }, Cmd.none )

    SavePlace newPlace ->
      ( { model | places = newPlace :: model.places }, submitPlace newPlace )

    SetPlaceId placeIdToFetch ->
      ( { model | placeId = placeIdToFetch }, Cmd.none )

    FetchPlace placeIdToFetch ->
      ( model, fetchPlaceById placeIdToFetch )

    NewPlace (Ok newPlace) ->
      ( { model | editedPlace = newPlace, errorMessage = "" }, Cmd.none )

    NewPlace (Err err) ->
      case err of
        Http.BadStatus response ->
          ( { model | errorMessage = (toString response.status.code) ++ " " ++  response.status.message }, Cmd.none )

        _ ->
          ( model, Cmd.none )

    SubmitPlace (Ok message) ->
      ( model, Cmd.none )

    SubmitPlace (Err _) ->
      ( model, Cmd.none )

view : Model -> Html Msg
view model =
  div []
    [ fetchPlaceForm model
    , input [ type_ "text", placeholder "Postal Code", defaultValue model.editedPlace.postalCode, onInput SetPostalCode ] []
    , input [ type_ "text", placeholder "Name", defaultValue model.editedPlace.name, onInput SetName ] []
    , button [ onClick (SavePlace model.editedPlace) ] [ text "Save" ]
    , placesList model.places
    ]

fetchPlaceForm : Model -> Html Msg
fetchPlaceForm model =
  div []
    [ input [ type_ "text", placeholder "Enter postal code...", onInput SetPlaceId ] []
    , button [ onClick (FetchPlace model.placeId) ] [ text "Get place" ]
    , p [ style [ ("color", "red") ] ] [ text model.errorMessage ]
    , br [] []
    ]

placesList places =
  table []
    [ thead []
      [ tr []
          [ th [] [ text "Postal Code" ]
          , th [] [ text "Name" ]
          ]
      ]
    , tbody [] (List.map placeRow places)
    ]

placeRow place =
  tr []
    [ td [] [ text place.postalCode ]
    , td [] [ text place.name ]
    ]


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }