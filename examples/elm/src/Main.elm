module Main exposing (..)

import Html exposing (Html, text, div, button)
import Html.Events exposing (onClick)

type alias Model = Int

type Msg = Increment | Decrement

init : ( Model, Cmd Msg )
init =
  ( 0, Cmd.none )

view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text <| toString model ]
    , button [ onClick Increment ] [ text "+" ]
    ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Increment ->
      ( model + 1, Cmd.none )

    Decrement ->
      ( model - 1, Cmd.none )

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