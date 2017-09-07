module Core.App exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, href)
import Models exposing (Model, Page(..), Route(..), PlaceId, Place)
import Routing exposing (toUrl)
import Msgs exposing (Msg(..))
import Places.List exposing (placesList)
import Places.Edit exposing(placeForm)

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
    [ li [] [ a [  class "active", href <| toUrl HomeRoute ] [ text "Home" ] ]
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
      placeDetailsPage placeId place

    NotFoundPage ->
      notFoundView

homeView : Model -> Html Msg
homeView model =
  div [ class "container-fluid" ]
    [ h1 [] [ text "Welcome to Company Registry" ]
    ]

placesPage : (List Place) -> Html Msg
placesPage places =
  placesList places

placeDetailsPage : PlaceId -> Place -> Html Msg
placeDetailsPage placeId place =
  placeForm place

-- Html msg is a generic type. Msg is a concrete type and msg is a type variable
-- msg is used when view doesn't emit messages to make it more reusable
notFoundView : Html msg
notFoundView =
  div []
      [ text "Not found"
      ]