module Views.Table exposing (customizations)

import Html exposing (..)
import Html.Attributes as Attr exposing (class, href)
import Html.Events as E
import Table

customizations : Table.Customizations data msg
customizations =
    let
        defaults =
            Table.defaultCustomizations
    in
        { defaults
        | tableAttrs = [ class "table table-hover table-bordered" ]
        , thead = thead
        }

thead : List (String, Table.Status, Attribute msg) -> Table.HtmlDetails msg
thead columns =
    Table.HtmlDetails [] [ headerRow columns, filterRow columns ]

filterRow columns =
    Html.tr [] (List.map filterCell columns)

filterCell (columnName, status, onClick) =
    Html.th []
        [ input
            [ Attr.type_ "text"
            , class "form-control"
            , Attr.placeholder (columnName ++ "...")
            ] []
        ]

headerRow : List (String, Table.Status, Attribute msg) -> Html msg
headerRow columns =
    Html.tr [] (List.map headerCell columns)

headerCell : (String, Table.Status, Attribute msg) -> Html msg
headerCell (columnName, status, onClick) =
    let
        icon =
          case status of
            Table.Unsortable ->
              Html.text ""

            Table.Sortable selected ->
                if selected then (faIcon "sort-asc") else (faIcon "sort-desc")

            Table.Reversible Nothing ->
                faIcon "sort"

            Table.Reversible (Just isReversed) ->
                if isReversed then (faIcon "sort-desc") else (faIcon "sort-asc")
      in
        th [ onClick ]
            [ icon
            , text (" " ++ columnName)
            ]

faIcon : String -> Html msg
faIcon name =
    Html.i [ class ( "fa fa-" ++ name ) ] []