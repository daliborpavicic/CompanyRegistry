module Views.Page exposing (frame)

import Html exposing (..)
import Html.Attributes exposing (class)
import Route exposing (Route(..))

frame : Html msg -> Html msg
frame pageContent =
    div [ class "container-fluid" ]
        [ div [ class "row" ]
            [ viewHeader ]
        , div [ class "row" ]
            [ div [ class "col-sm-2"]
                [ viewSideNavBar ]
            , div [ class "col-sm-10" ]
                [ pageContent ]
            ]
        ]

viewHeader : Html msg
viewHeader =
    nav [ class "navbar navbar-default" ]
        [ text "Company Registry" ]

viewSideNavBar : Html msg
viewSideNavBar =
    ul [ class "nav nav-sidebar" ]
        [ li [] [ a [ Route.href Home ] [ text "Home" ] ]
        , li [] [ a [ Route.href Places ] [ text "Places" ] ]
--        , li [] [ a [ href "#companies" ] [ text "Companies" ] ]
        ]

