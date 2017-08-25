module Main exposing (..)

import Navigation exposing (Location)
import Msgs exposing (..)
import Models exposing (Model, initialModel)
import View exposing (view)
import Update exposing (update, urlUpdate)
import Subscriptions exposing (subscriptions)

init : Location -> ( Model, Cmd Msg )
init location =
  initialModel |> urlUpdate location

main : Program Never Model Msg
main =
    Navigation.program Msgs.OnLocationChange
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }