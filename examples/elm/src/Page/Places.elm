module Page.Places exposing (Model, Msg, init, update, view)

import Data.Place exposing (Place)
import Http
import Html exposing (..)
import Html.Attributes exposing (href)
import Request.Place
import Task exposing (Task)

type alias Model =
    { places: List Place
    }

init : Task Http.Error Model
init =
    let
        loadPlaces =
            Request.Place.fetchPlaces
                |> Http.toTask
    in
        Task.map Model loadPlaces

type Msg
    = NoOp

view : Model -> Html Msg
view model =
    table []
        [ thead []
          [ tr []
              [ th [] [ text "Postal Code" ]
              , th [] [ text "Name" ]
              ]
          ]
        , tbody [] (List.map placeRow model.places)
        ]

placeRow : Place -> Html Msg
placeRow place =
  tr []
    [ td [] [ a [ href ("#places/" ++ place.id) ] [ text place.postalCode ] ]
    , td [] [ text place.name ]
    ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )