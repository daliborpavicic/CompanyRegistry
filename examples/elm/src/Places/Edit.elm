module Places.Edit exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, value, href, type_, placeholder, value)
--import Html.Events exposing (onInput, onClick)
import Msgs exposing (Msg)
import Models exposing (Place)
import Routing exposing (placesPath)

view : Place -> Html Msg
view model =
  div  []
    [ placeForm model ]

placeForm : Place -> Html Msg
placeForm place =
  div [ class "container" ]
    [ text <| toString place
    , div []
      [ button [] [ text "Save" ]
      , backToListBtn
      ]
    ]

backToListBtn : Html Msg
backToListBtn =
  a
    [ class "btn"
    , href placesPath
    ]
    [ text "Back" ]
