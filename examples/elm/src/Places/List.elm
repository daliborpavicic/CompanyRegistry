module Places.List exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, href)
import Html.Events exposing (onClick)
import Routing exposing (placePath)
import Msgs exposing (Msg(..))
import Models exposing (Place, Page(PlaceDetailsPage), emptyPlace)

placesList : List Place -> Html Msg
placesList places =
  div [ class "container" ]
    [ h3 [] [ text "Places" ]
    , table [ class "table table-hover table-bordered" ]
      [ thead []
        [ tr []
          [ th [] [ text "Id" ]
          , th [] [ text "Postal Code" ]
          , th [] [ text "Name" ]
          ]
        ]
      , tbody [] ( List.map placeRow places )
      ]
    , addNewPlaceBtn
    ]

placeRow : Place -> Html Msg
placeRow place =
  tr [ onClick (NavigateTo (PlaceDetailsPage place.id place)) ]
    [ td [] [ text place.id ]
    , td [] [ text place.postalCode]
    , td [] [ text place.name ]
    ]

addNewPlaceBtn : Html Msg
addNewPlaceBtn =
  a
    [ class "btn btn-primary", onClick (NavigateTo (PlaceDetailsPage "new" emptyPlace) ) ]
    [ text "Add place" ]