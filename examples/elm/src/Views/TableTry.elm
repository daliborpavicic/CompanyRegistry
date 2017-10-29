module Views.Table exposing (view, stringColumn, config, Config, State, initialState)

import Html exposing (..)
import Html.Attributes exposing (href, class, type_, placeholder, classList)
import Html.Events as Events exposing (onInput, onClick)
import Json.Decode as Json

type State =
    State String

initialState : String -> State
initialState title =
    State title

type alias ColumnData data msg =
    { name : String
    , viewData : data -> Html msg
    }

type Column data msg =
    Column (ColumnData data msg)

type Config data msg =
    Config
        { toMsg : State -> msg
        , columns : List (ColumnData data msg)
        }

config :
    { toMsg : State -> msg
    , columns : List (Column data msg)
    }
    -> Config data msg
config { toMsg, columns } =
    Config
        { toMsg = toMsg
        , columns = List.map (\(Column cData) -> cData) columns
        }

stringColumn : String -> (data -> String) -> Column data msg
stringColumn name toStr =
    Column
        { name = name
        , viewData = Html.text << toStr
        }


view (Config { toMsg, columns }) state data =
    let
        cols = Debug.log "columns" columns
    in
    table [ class "table table-hover table-bordered" ]
        [ tableCaption state toMsg
        , thead []
          [ tr [] (List.map (\column -> headerCell column) columns)
          ]
        , tbody [] (List.map (\data -> dataRow columns data) data)
        ]

tableCaption : State -> (State -> msg) -> Html msg
tableCaption (State title) toMsg =
    caption [ (onClickCaption title toMsg) ] [ text title ]

dataRow : List (ColumnData data msg) -> data -> Html msg
dataRow columns data =
    tr []
        (List.map (\column -> dataCell column.viewData data) columns)

headerCell : ColumnData data msg -> Html msg
headerCell { name, viewData } =
    th []
        [ i [ class "fa fa-sort" ] []
        , text name
        ]

dataCell : (data -> Html msg) -> data -> Html msg
dataCell toHtml data =
    td []
        [ toHtml data ]

onClickCaption : String -> (State -> msg) -> Attribute msg
onClickCaption title toMsg =
    Events.on "click" <| Json.map toMsg <|
        Json.map State (Json.succeed "New caption")