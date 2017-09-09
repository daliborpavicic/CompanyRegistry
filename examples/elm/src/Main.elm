module Main exposing (..)

import Html exposing (Html)
import Models exposing (init, Model)
import Messages exposing (Msg)
import View exposing (view)
import Update exposing (update)
import Subscriptions exposing (subscriptions)

main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }