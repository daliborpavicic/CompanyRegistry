module Core.App exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, href)
import Models exposing (Model, Page(..), Route(..), PlaceId, Place)
import Routing exposing (toUrl)
import Msgs exposing (Msg(..))

appView : Model -> Html Msg
appView model =
    div [ class "container-fluid" ]
      [ div [ class "row"]
        [ div [ class "col-sm-2" ] [ nav model, text (toString model.message) ]
        , div [ class "col-sm-10"] [ page model ]
        ]
      ]

nav : Model -> Html Msg
nav model =
  ul [ class "nav nav-sidebar" ]
    [ li [ class "active" ] [ a [ href <| toUrl HomeRoute ] [ text "Home" ] ]
    , li [] [ a [ href <| toUrl PlacesRoute ] [ text "Places" ] ]
    ]

page : Model -> Html Msg
page model =
  case model.currentPage of
    HomePage ->
      homeView model

    PlacesPage places ->
      placesPage places

    PlaceDetailsPage placeId place ->
      placeDetailsPage model placeId place

    NotFoundPage ->
      notFoundView

homeView : Model -> Html Msg
homeView model =
  div [ class "container-fluid" ]
    [ h1 [] [ text "Welcome to Company Registry" ]
    ]

placesPage : (List Place) -> Html Msg
placesPage places =
  text (toString places)

placeDetailsPage : Model -> PlaceId -> Place -> Html Msg
placeDetailsPage model placeId place =
  text (toString place)

-- Html msg is a generic type. Msg is a concrete type and msg is a type variable
-- msg is used when view doesn't emit messages to make it more reusable
notFoundView : Html msg
notFoundView =
  div []
      [ text "Not found"
      ]