module View exposing (..)

import Html exposing (Html)
import Msgs exposing (Msg(..))
import Models exposing (Model)
import Core.App exposing (appView)

view : Model -> Html Msg
view model =
  appView model




