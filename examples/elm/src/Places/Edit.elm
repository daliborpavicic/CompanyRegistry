module Places.Edit exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, value, href, type_, placeholder, defaultValue)
import Html.Events exposing (onInput, onClick, onSubmit)
import Msgs exposing (Msg)
import Models exposing (Place)
import Routing exposing (placesPath)
import Views.Form as Form

view : Place -> Html Msg
view model =
  div  []
    [ placeForm model ]

placeForm : Place -> Html Msg
placeForm place =
  div [ class "container" ]
    [ form [ class "form-horizontal", onSubmit Msgs.SubmitPlaceForm ]
      [ Form.input
        [ defaultValue place.postalCode
        , onInput Msgs.SetPostalCode
        ]
        []
      , Form.input
        [ defaultValue place.name
        , onInput Msgs.SetPlaceName
        ]
        []
      , div [ class "col-sm-offset-2" ]
          [ button [ type_ "submit", class "btn btn-primary" ] [ text "Save" ] ]
      ]
    ]

backToListBtn : Html Msg
backToListBtn =
  a
    [ class "btn"
    , href placesPath
    ]
    [ text "Back" ]
