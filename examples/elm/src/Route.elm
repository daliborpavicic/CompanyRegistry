module Route exposing (Route(..), fromLocation, href, modifyUrl)

import Data.Place as Place
import Html exposing (Attribute)
import Html.Attributes as Attributes
import Navigation exposing (Location)
import UrlParser as Url exposing ((</>), Parser, oneOf, parseHash, s, string)

type Route
    = Home
    | Places
    | Place String

matchers : Parser ( Route -> a ) a
matchers =
    oneOf
        [ Url.map Home Url.top
        , Url.map Place (s "places" </> string)
        , Url.map Places (s "places")
        ]

routeToString : Route -> String
routeToString route =
    let
        pieces =
            case route of
                Home ->
                    []
                Places ->
                    [ "places" ]

                Place id ->
                    [ "places", id ]
    in
        "#/" ++ String.join "/" pieces

href : Route -> Attribute msg
href route =
    Attributes.href (routeToString route)

modifyUrl : Route -> Cmd msg
modifyUrl =
    routeToString >> Navigation.modifyUrl

fromLocation : Location -> Maybe Route
fromLocation location =
    if String.isEmpty location.hash then
        Just Home
    else
        parseHash matchers location