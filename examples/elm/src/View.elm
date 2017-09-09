module View exposing (..)

import Html exposing (Html, div, text)
import Models exposing (Model)
import Messages exposing (Msg(PlacesMsg))
import Places.Edit

view : Model -> Html Msg
view model =
  div []
    [ Html.map PlacesMsg <| Places.Edit.view model.placeEditView
    ]

