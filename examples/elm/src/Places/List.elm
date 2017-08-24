module Places.List exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)
import Msgs exposing (Msg)
import Models exposing (Place)
import RemoteData exposing (WebData)

view : WebData (List Place) -> Html Msg
view response =
  div []
    [ nav
    , maybeList response
    ]

maybeList : WebData (List Place) -> Html Msg
maybeList response =
  case response of
    RemoteData.NotAsked ->
      text ""
    RemoteData.Loading ->
      text "Loading ..."
    RemoteData.Success places ->
      placesList places
    RemoteData.Failure error ->
      text (toString error)

nav : Html Msg
nav =
  div [] [
    h2 [] [ text "Places" ]
  ]

placesList : List Place -> Html Msg
placesList places =
  div [ class "container" ]
    [ table []
      [ thead []
        [ tr []
          [ th [] [ text "Id" ]
          , th [] [ text "Postal Code" ]
          , th [] [ text "Name" ]
          ]
        ]
      , tbody [] ( List.map placeRow places )
      ]
    ]

placeRow : Place -> Html Msg
placeRow place =
  tr []
    [ td [] [ text place.id ]
    , td [] [ text place.postalCode]
    , td [] [ text place.name ]
    ]