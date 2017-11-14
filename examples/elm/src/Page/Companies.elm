module Page.Companies exposing (Model, Msg, init, update, view)

import Data.Company exposing (Company)
import Http
import Html exposing (..)
import Html.Attributes exposing (href, class, type_, placeholder, classList)
import Request.Company
import Task exposing (Task)
import Views.FilterableTable as FTable exposing (Filters, ColumnConfig)
import Table

type alias Model =
    { tableState : Table.State
    , filters : Filters Company
    , companies : List Company
    }

init : Task Http.Error Model
init =
    let
        loadCompanies =
            Request.Company.fetchCompanies
                |> Http.toTask
    in
        Task.map (Model (Table.initialSort pib.name) initialFilters) loadCompanies

pib : ColumnConfig Company
pib =
    ColumnConfig "PIB" .pib

companyName : ColumnConfig Company
companyName =
    ColumnConfig "Name" .name

phoneNumber : ColumnConfig Company
phoneNumber =
    ColumnConfig "Phone Number" .phoneNumber

email : ColumnConfig Company
email =
    ColumnConfig "Email" .email

initialFilters : Filters Company
initialFilters =
    FTable.filters
        [ (pib.name, FTable.stringFilter pib.toStr "")
        , (companyName.name, FTable.stringFilter companyName.toStr "")
        , (phoneNumber.name, FTable.stringFilter phoneNumber.toStr "")
        , (email.name, FTable.stringFilter email.toStr "")
        ]

config : Table.Config Company Msg
config =
    Table.customConfig
        { toId = .id
        , toMsg = SetTableState
        , columns =
            [ Table.stringColumn pib.name pib.toStr
            , Table.stringColumn companyName.name companyName.toStr
            , Table.stringColumn phoneNumber.name phoneNumber.toStr
            , Table.stringColumn email.name email.toStr
            ]
        , customizations = FTable.customizations SetColumnFilter
        }

type Msg
    = NoOp
    | SetTableState Table.State
    | SetColumnFilter String String

view : Model -> Html Msg
view { tableState, filters, companies } =
    let
        filteredCompanies =
            FTable.filterData filters companies
    in
        div []
            [ h3 [] [ text "Companies list" ]
            , Table.view config tableState filteredCompanies
            , hr [] []
            , div [] [ a [ class "btn btn-primary", href "#companies/new" ] [ text "Add new company" ] ]
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