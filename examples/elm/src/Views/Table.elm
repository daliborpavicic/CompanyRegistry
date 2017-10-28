module Views.Table exposing (view, stringColumn, config, Config)

import Html exposing (..)
import Html.Attributes exposing (href, class, type_, placeholder, classList)
import Html.Events exposing (onInput, onClick)

type alias ColumnData data msg =
    { name : String
    , viewData : data -> Html msg
    }

type Column data msg =
    Column (ColumnData data msg)

type Config data msg =
    Config
        { columns : List (ColumnData data msg)
        }

config : { columns : List (Column data msg) } -> Config data msg
config { columns } =
    Config
        { columns = List.map (\(Column cData) -> cData) columns
        }

stringColumn : String -> (data -> String) -> Column data msg
stringColumn name toStr =
    Column
        { name = name
        , viewData = Html.text << toStr
        }
view (Config { columns }) data =
    let
        cols = Debug.log "columns" columns
    in
    table [ class "table table-hover table-bordered" ]
        [ thead []
          [ tr [] (List.map (\column -> headerCell column) columns)
          ]
        , tbody [] (List.map (\data -> dataRow columns data) data)
        ]

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