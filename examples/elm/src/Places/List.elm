module Places.List exposing (placesList)

import Html exposing (Html, text, div, button, input, table, thead, tbody, tr, th, td, br, p, form, label, i, h3, hr)
import Places.Models exposing (Place)
import Places.Messages exposing (Msg(..))

placesList : List Place -> Html Msg
placesList places =
  table []
    [ thead []
      [ tr []
          [ th [] [ text "Postal Code" ]
          , th [] [ text "Name" ]
          ]
      ]
    , tbody [] (List.map placeRow places)
    ]

placeRow : Place -> Html Msg
placeRow place =
  tr []
    [ td [] [ text place.postalCode ]
    , td [] [ text place.name ]
    ]