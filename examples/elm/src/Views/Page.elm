module Views.Page exposing (frame)

import Html exposing (..)
import Html.Attributes exposing (..)
import Route exposing (Route(..))

frame : Maybe Route -> Html msg -> Html msg
frame activeRoute pageContent =
    div [ class "container-fluid" ]
        [ div [ class "row" ]
            [ div [ class "col-sm-2"]
                [ viewSideNavBar activeRoute ]
            , div [ class "col-sm-10" ]
                [ pageContent ]
            ]
        ]

viewSideNavBar : Maybe Route -> Html msg
viewSideNavBar activeRoute =
    let
        maybeActiveLink =
            navbarLink activeRoute
    in
    ul [ class "nav nav-sidebar" ]
        [ maybeActiveLink Home [ text "Home" ]
        , maybeActiveLink Places [ text "Places" ]
        , maybeActiveLink Employees [ text "Employees" ]
        , maybeActiveLink Companies [ text "Companies" ]
        ]

navbarLink : Maybe Route -> Route -> List (Html msg) -> Html msg
navbarLink activeRoute route linkContent =
    let
        isActive =
            case activeRoute of
                Nothing ->
                    False
                Just activeRoute ->
                    activeRoute == route
    in
    li [ class "nav-item" ]
        [ a [ Route.href route, classList [ ("active", isActive) ] ] linkContent ]

