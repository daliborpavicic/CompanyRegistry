module Views.Form exposing (..)

import Html exposing (Attribute, Html, div, li, text, ul, label)
import Html.Attributes exposing (class, type_)

input : List (Attribute msg) -> List (Html msg) -> Html msg
input attrs =
    control Html.input ([ type_ "text" ] ++ attrs)

control :
    (List (Attribute msg) -> List (Html msg) -> Html msg)
    -> List (Attribute msg)
    -> List (Html msg)
    -> Html msg
control element attributes children =
    div [ class "form-group" ]
        [ label [ class "control-label col-sm-2" ] [ text "Default label" ]
        , div [ class "col-sm-6 col-md-4" ]
            [ element (class "form-control" :: attributes) children ]
        ]