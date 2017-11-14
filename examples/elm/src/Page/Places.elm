module Page.Places exposing (Model, Msg, init, update, view)

import Data.Place exposing (Place)
import Http
import Html exposing (..)
import Html.Attributes exposing (href, class, type_, placeholder, classList)
import Html.Events exposing (onInput, onClick)
import Request.Place
import Task exposing (Task)
import Views.FilterableTable as FTable exposing (Filters, ColumnConfig)
import Table

type alias Model =
    { tableState : Table.State
    , filters : Filters Place
    , places: List Place
    }

init : Task Http.Error Model
init =
    let
        loadPlaces =
            Request.Place.fetchPlaces
                |> Http.toTask
    in
        Task.map (Model (Table.initialSort postalCode.name) initialFilters) loadPlaces

postalCode : ColumnConfig Place
postalCode =
    ColumnConfig "Postal Code" .postalCode

placeName : ColumnConfig Place
placeName =
    ColumnConfig "Name" .name

initialFilters : Filters Place
initialFilters =
    FTable.filters
        [ (postalCode.name, FTable.stringFilter postalCode.toStr "")
        , (placeName.name, FTable.stringFilter .name "")
        ]

config : Table.Config Place Msg
config =
    Table.customConfig
        { toId = .id
        , toMsg = SetTableState
        , columns =
            [ Table.stringColumn postalCode.name postalCode.toStr
            , Table.stringColumn placeName.name placeName.toStr
            ]
        , customizations = FTable.customizations SetColumnFilter
        }

type Msg
    = NoOp
    | SetTableState Table.State
    | SetColumnFilter String String

view : Model -> Html Msg
view { tableState, filters, places } =
    let
        filteredPlaces =
            FTable.filterData filters places
    in
        div []
            [ h3 [] [ text "Places list" ]
            , Table.view config tableState filteredPlaces
            , hr [] []
            , div [] [ a [ class "btn btn-primary", href "#places/new" ] [ text "Add new place" ] ]
            ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        SetTableState newState ->
            ( { model | tableState = newState }
            , Cmd.none
            )

        SetColumnFilter columnName filterTerm ->
            let
                currentFilters =
                    model.filters
            in
            ({ model | filters = (FTable.setFilterTerm columnName filterTerm currentFilters) }, Cmd.none )