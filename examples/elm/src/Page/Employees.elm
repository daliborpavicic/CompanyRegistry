module Page.Employees exposing (Model, Msg, init, update, view)

import Data.Employee exposing (Employee)
import Http
import Html exposing (..)
import Html.Attributes exposing (href, class, type_, placeholder, classList)
import Html.Events exposing (onClick)
import Request.Employee
import Task exposing (Task)
import Views.FilterableTable as FTable exposing (Filters, ColumnConfig)
import Table
import Route

type alias Model =
    { tableState : Table.State
    , filters : Filters Employee
    , employees : List Employee
    }

init : Task Http.Error Model
init =
    let
        loadEmployees =
            Request.Employee.fetchEmployees
                |> Http.toTask
    in
        Task.map (Model (Table.initialSort jmbg.name) initialFilters) loadEmployees

jmbg : ColumnConfig Employee
jmbg =
    ColumnConfig "JMBG" .jmbg

employeeName : ColumnConfig Employee
employeeName =
    ColumnConfig "Name" .name

surname : ColumnConfig Employee
surname =
    ColumnConfig "Surname" .surname

email : ColumnConfig Employee
email =
    ColumnConfig "Email" .email

initialFilters : Filters Employee
initialFilters =
    FTable.filters
        [ (jmbg.name, FTable.stringFilter jmbg.toStr "")
        , (employeeName.name, FTable.stringFilter employeeName.toStr "")
        , (surname.name, FTable.stringFilter surname.toStr "")
        , (email.name, FTable.stringFilter email.toStr "")
        ]

config : Table.Config Employee Msg
config =
    Table.customConfig
        { toId = .id
        , toMsg = SetTableState
        , columns =
            [ Table.stringColumn jmbg.name jmbg.toStr
            , Table.stringColumn employeeName.name employeeName.toStr
            , Table.stringColumn surname.name surname.toStr
            , Table.stringColumn email.name email.toStr
            ]
        , customizations = FTable.customizations SetColumnFilter toRowAttrs
        }

toRowAttrs : Employee -> List (Attribute Msg)
toRowAttrs employee =
    [ onClick (NavigateToEmployee employee.id)
    ]

type Msg
    = NoOp
    | SetTableState Table.State
    | SetColumnFilter String String
    | NavigateToEmployee String

view : Model -> Html Msg
view { tableState, filters, employees } =
    let
        filteredEmployees =
            FTable.filterData filters employees
    in
        div []
            [ h3 [] [ text "Employees list" ]
            , Table.view config tableState filteredEmployees
            , hr [] []
            , div [] [ a [ class "btn btn-primary", href "#employees/new" ] [ text "Add new employee" ] ]
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

        NavigateToEmployee id ->
            ( model, Route.modifyUrl (Route.Employee id) )