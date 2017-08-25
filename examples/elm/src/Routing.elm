module Routing exposing (..)

import Navigation exposing (Location)
import UrlParser as P exposing ((</>))
import Models exposing (PlaceId, Place, Route(..), Page(..))

matchers : P.Parser (Route -> a) a
matchers =
  P.oneOf
    [ P.map HomeRoute P.top
    , P.map PlacesRoute (P.s "places")
    , P.map PlaceDetailsRoute (P.s "places" </> P.string)
    ]

parseLocation : Location -> Route
parseLocation location =
  case (P.parseHash matchers location) of
    Just route ->
      route

    Nothing ->
      NotFoundRoute

-- Helper to turn Route into a url for the browser
toUrl : Route -> String
toUrl route =
    let
        hashPage =
            case route of
                HomeRoute ->
                    "/"

                PlacesRoute ->
                    "/places"

                PlaceDetailsRoute id ->
                    "/places/" ++ id

                NotFoundRoute ->
                  "/404"

    in
        "/#" ++ hashPage

-- helper to turn valid Page (with Data) into a Route
toRoute : Page -> Route
toRoute page =
    case page of
        HomePage ->
          HomeRoute

        PlacesPage _ ->
          PlacesRoute

        PlaceDetailsPage id _ ->
          PlaceDetailsRoute id

        NotFoundPage ->
          NotFoundRoute

-- helper to match Route to Page
isEqual : Route -> Page -> Bool
isEqual urlPage page =
    urlPage == toRoute page

{- helper to change browser bar to new url without adding to history
for correcting invalid routes
or for changing a url back to url for current page while data loads
-}
modifyUrl : Page -> Cmd msg
modifyUrl =
    Navigation.modifyUrl << toUrl << toRoute

-- helper to change browser bar to new url, adding to browser history
newUrl : Page -> Cmd msg
newUrl =
    Navigation.newUrl << toUrl << toRoute

placesPath : String
placesPath =
  "#places"

placePath : PlaceId -> String
placePath id =
  "#places/" ++ id
