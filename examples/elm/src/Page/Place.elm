module Page.Place exposing (Model, Msg, init, update, view)

import Data.Place exposing (Place, PlaceId)
import Http
import Html exposing (..)
import Html.Attributes exposing (href, class, type_, placeholder, value)
--import Html.Events exposing (onInput)
import Request.Place
import Task exposing (Task)

type alias Model =
    { editedPlace : Place
    , originalPlace : Place
    }

init : PlaceId -> Task Http.Error Model
init id =
    let
        loadPlace =
            Request.Place.fetchPlaceById id
            |> Http.toTask
    in
        Task.map (Model (Place "" "" "")) loadPlace

view : Model -> Html Msg
view model =
    placeForm model

placeForm : Model -> Html Msg
placeForm model =
  div []
    [ h3 [] [ text "Edit place" ]
    , hr [] []
    , Html.form [ class "form-horizontal" ]
      [ div [ class "form-group" ]
        [ label [ class "control-label col-sm-2" ] [ text "Postal Code" ]
        , div [ class "col-sm-6 col-md-4" ]
            [ input
              [ type_ "text"
              , class "form-control"
              , placeholder "Postal Code"
              , value model.editedPlace.postalCode
--              , onInput SetPostalCode
              ] []
            ]
        ]
      , div [ class "form-group" ]
        [ label [ class "control-label col-sm-2" ] [ text "Name" ]
        , div [ class "col-sm-6 col-md-4" ]
            [ input
              [ type_ "text"
              , class "form-control"
              , placeholder "Name"
              , value model.editedPlace.name
--              , onInput SetName
              ] []
            ]
        ]
       , div [ class "col-sm-offset-2" ] []
--          [ button [ class "btn btn-primary", type_ "button", onClick (SavePlace model.editedPlace) ] [ text "Save" ]
--          , button [ class "btn btn-warning", type_ "button", onClick RevertChanges ] [ text "Revert" ]
--          , button [ class "btn btn-danger", type_ "button", onClick (DeletePlace model.editedPlace.postalCode) ] [ text "Delete" ]
--          , button
--              [ class "btn btn-default"
--              , type_ "button"
--              ]
--              [ i [ class "fa fa-chevron-left" ] []
--              , text " Back"
--              ]
--          ]
      ]
  ]

type Msg
    = NoOp

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

