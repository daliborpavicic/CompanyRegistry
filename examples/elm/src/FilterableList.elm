module FilterableList exposing (..)

import Html exposing (..)
import Html.Events exposing (onClick, onInput)
import Html.Attributes as Attr

-- MODEL

type alias ListModel = String

-- UPDATE


type FilterSetter
    = SetFilter String

setFilter : FilterSetter -> ListModel -> ListModel
setFilter action listModel =
  case action of
    SetFilter newValue ->
        newValue

-- VIEW

viewList : Config msg -> ListModel -> List String -> Html msg
viewList (Config { setFilterMsg }) listModel data =
  let
    filteredList =
        List.filter (\item -> String.isEmpty listModel || (String.contains listModel item)) data
  in
  div []
    [ input
        [ Attr.type_ "text"
        , Attr.value listModel
        , Attr.placeholder "Filter..."
        , onInput (setFilterMsg << SetFilter)
        ] []
    , ul [] (List.map (\fruit -> Html.li [] [ Html.text fruit ]) filteredList)
    ]

type Config msg =
    Config
        { setFilterMsg : (FilterSetter -> msg)
        }

config { setFilterMsg } =
    Config
        { setFilterMsg = setFilterMsg
        }