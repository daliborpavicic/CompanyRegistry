module Main exposing (..)

import Html exposing (Html, text, div, button, input, table, thead, tbody, tr, th, td)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)

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

type alias Model =
  { editedPlace : Place
  , places : List Place
  }

type Msg
    = SetPostalCode String
    | SetName String
    | SavePlace Place

init : ( Model, Cmd Msg )
init =
  let
    initialModel = { editedPlace = Place "" "" "", places = [] }
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
      ( { model | places = newPlace :: model.places }, Cmd.none )

view : Model -> Html Msg
view model =
  div []
    [ input [ type_ "text", placeholder "Postal Code", onInput SetPostalCode ] []
    , input [ type_ "text", placeholder "Name", onInput SetName ] []
    , button [ onClick (SavePlace model.editedPlace) ] [ text "Save" ]
    , placesList model.places
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