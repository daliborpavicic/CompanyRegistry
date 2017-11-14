module Views.FilterableTable exposing (customizations, Filters, stringFilter, filters, setFilterTerm, filterData, ColumnConfig)

import Html exposing (..)
import Html.Attributes as Attr exposing (class, href)
import Html.Events as E
import Table
import Dict

type alias ColumnConfig data =
    { name : String
    , toStr : (data -> String)
    }

type ColumnFilter data =
    ColumnFilter
        { dataToStr : (data -> String)
        , term : String
        }

type alias FiltersDict data = Dict.Dict String (ColumnFilter data)

type Filters data = Filters (FiltersDict data)

stringFilter : (data -> String) -> String -> ColumnFilter data
stringFilter dataToStr term =
    ColumnFilter
        { dataToStr = dataToStr
        , term = term
        }

filters : List (String, ColumnFilter data) -> Filters data
filters filtersConfig =
    Filters (Dict.fromList filtersConfig)

setFilterTerm : String -> String -> Filters data -> Filters data
setFilterTerm columnName newTerm (Filters filtersDict) =
    let
        currentFilter =
            Dict.get columnName filtersDict
    in
        case currentFilter of
            Just (ColumnFilter filter) ->
                let
                    newFilter =
                        ColumnFilter
                            { filter | term = newTerm }
                in
                Filters (Dict.insert columnName newFilter filtersDict)
            Nothing ->
                Filters filtersDict


filterData : Filters data -> List data -> List data
filterData (Filters filtersDict) data =
    List.filter (\record -> (isAllFiltersMatch record filtersDict)) data

isAllFiltersMatch : data -> FiltersDict data -> Bool
isAllFiltersMatch record filtersDict =
    let
        filtersList =
            Dict.toList filtersDict
    in
        List.all (\(columnName, columnFilter) -> (isFilterMatch record columnFilter)) filtersList

isFilterMatch : data -> ColumnFilter data -> Bool
isFilterMatch record (ColumnFilter { dataToStr, term }) =
    let
        columnValue =
            dataToStr record
    in
        String.isEmpty columnValue || String.contains term columnValue

customizations : (String -> String -> msg) -> Table.Customizations data msg
customizations onFilterColumn =
    let
        defaults =
            Table.defaultCustomizations
    in
        { defaults
        | tableAttrs = [ class "table table-hover table-bordered" ]
        , thead = thead onFilterColumn
        }

thead : (String -> String -> msg) -> List (String, Table.Status, Attribute msg) -> Table.HtmlDetails msg
thead onFilterColumn columns =
    Table.HtmlDetails [] [ headerRow columns, filterRow onFilterColumn columns ]

filterRow onFilterColumn columns =
    Html.tr [] (List.map (filterCell onFilterColumn) columns)

filterCell onFilterColumn (columnName, status, onClick) =
    Html.th []
        [ input
            [ Attr.type_ "text"
            , class "form-control"
            , Attr.placeholder (columnName ++ "...")
            , E.onInput (onFilterColumn columnName)
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