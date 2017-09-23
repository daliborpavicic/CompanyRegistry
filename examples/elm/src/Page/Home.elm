module Page.Home exposing (Model, Msg, init, update, view)

import Html exposing (..)
import Html.Attributes exposing (class, href)
import Task exposing (Task)

type alias Model =
    { welcomeMessage : String
    }

init : Task String Model
init =
    Task.succeed (Model "Welcome to Company Registry!")

view : Model -> Html Msg
view model =
  div [ class "container-fluid" ]
      [ div [ class "row" ]
          [ div [ class "col-sm-2" ]
              [ nav model ]
          , div [ class "col-sm-10" ] []
          ]
      ]

nav : Model -> Html Msg
nav model =
    ul [ class "nav nav-sidebar" ]
        [ li [] [ a [ href "#/" ] [ text "Home" ] ]
        , li [] [ a [ href "#places" ] [ text "Places" ] ]
        , li [] [ a [ href "#companies" ] [ text "Companies" ] ]
        ]

type Msg
    = NoOp

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )