module Views.Table exposing (..)

import Html exposing (..)
import Html.Attributes as Attr exposing (class, href)
import Html.Events as E
import Table

initialModel sortedColumn =
    TableModel (Table.initialSort sortedColumn) ""

type alias TableModel =
    { sortState: Table.State
    , currentFilter : String
    }

type TableModifier
    = SetSortState Table.State
    | SetFilter String FilterTerm

type alias RecordWithId a = { a | id : String }

type alias FilterTerm = String

modifyTable : TableModifier -> TableModel -> TableModel
modifyTable tableModifier tableModel =
    case tableModifier of
        SetSortState newSortState ->
            { tableModel | sortState = newSortState }

        SetFilter columnName filterTerm ->
            let
                col = Debug.log "column name: " columnName
            in
            { tableModel | currentFilter = filterTerm }

viewTable : Config data msg -> TableModel -> List (RecordWithId data) -> Html msg
viewTable (Config { columns, modifyMsg }) tableModel =
    let
        sortableTableConfig =
            Table.customConfig
                { toId = .id
                , toMsg = (modifyMsg << SetSortState)
                , columns = columns
                , customizations = (customizations modifyMsg)
                }

        currentFilter = Debug.log "Filter: " tableModel.currentFilter
    in
        Table.view sortableTableConfig tableModel.sortState

type Config data msg =
    Config
        { columns : List (Table.Column (RecordWithId data) msg)
        , modifyMsg : (TableModifier -> msg)
        }

stringColumn : String -> (data -> String) -> Table.Column data msg
stringColumn columnName toStr =
    Table.stringColumn columnName toStr

customizations : (TableModifier -> msg) -> Table.Customizations data msg
customizations modifyMsg =
    let
        defaults =
            Table.defaultCustomizations
    in
        { defaults
        | tableAttrs = [ class "table table-hover table-bordered" ]
        , thead = thead modifyMsg
        }

thead : (TableModifier -> msg) -> List (String, Table.Status, Attribute msg) -> Table.HtmlDetails msg
thead modifyMsg columns =
    Table.HtmlDetails [] [ headerRow columns, filterRow modifyMsg columns ]

filterRow modifyMsg columns =
    Html.tr [] (List.map (\column -> filterCell modifyMsg column) columns)

filterCell modifyMsg (columnName, status, onClick) =
    Html.th []
        [ input
            [ Attr.type_ "text"
            , class "form-control"
            , Attr.placeholder (columnName ++ "...")
            , E.onInput (modifyMsg << (SetFilter columnName))
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