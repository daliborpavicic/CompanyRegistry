module Main exposing (main)

import Page.Home as Home
import Page.Places as Places
import Page.Place as Place
import Page.Employees as Employees
import Page.Employee as Employee
import Page.Companies as Companies
import Page.Company as Company
import Views.Page as Page
import Route exposing (Route)
import Task
import Http
import Html exposing (..)
import Navigation exposing (Location)

type Page
    = Blank
    | Home Home.Model
    | Places Places.Model
    | Place Place.Model
    | Employees Employees.Model
    | Employee Employee.Model
    | Companies Companies.Model
    | Company Company.Model

type alias Model =
    { currentPage : Page
    }

init : Location -> ( Model, Cmd Msg )
init location =
    setRoute (Route.fromLocation location)
        { currentPage = initialPage
        }

initialPage : Page
initialPage =
    Blank

view : Model -> Html Msg
view model =
    viewPage model.currentPage

viewPage : Page -> Html Msg
viewPage page =
    let
        frame =
            Page.frame
    in
    case page of
        Blank ->
            frame (Html.text "Blank Page!")

        Home subModel ->
            Home.view subModel
                |> frame
                |> Html.map HomeMsg

        Places subModel ->
            Places.view subModel
                |> frame
                |> Html.map PlacesMsg

        Place subModel ->
            Place.view subModel
                |> frame
                |> Html.map PlaceMsg

        Employees subModel ->
            Employees.view subModel
                |> frame
                |> Html.map EmployeesMsg

        Employee subModel ->
            Employee.view subModel
                |> frame
                |> Html.map EmployeeMsg

        Companies subModel ->
            Companies.view subModel
                |> frame
                |> Html.map CompaniesMsg

        Company subModel ->
            Company.view subModel
                |> frame
                |> Html.map CompanyMsg

type Msg
    = SetRoute (Maybe Route)
    | HomeLoaded (Result String Home.Model)
    | PlacesLoaded (Result Http.Error Places.Model)
    | PlaceLoaded (Result Http.Error Place.Model)
    | EmployeesLoaded (Result Http.Error Employees.Model)
    | EmployeeLoaded (Result Http.Error Employee.Model)
    | CompaniesLoaded (Result Http.Error Companies.Model)
    | CompanyLoaded (Result Http.Error Company.Model)
    | HomeMsg Home.Msg
    | PlacesMsg Places.Msg
    | PlaceMsg Place.Msg
    | EmployeesMsg Employees.Msg
    | EmployeeMsg Employee.Msg
    | CompaniesMsg Companies.Msg
    | CompanyMsg Company.Msg

setRoute : Maybe Route -> Model -> ( Model, Cmd Msg )
setRoute maybeRoute model =
    let
        transition toMsg task =
            ( model, Task.attempt toMsg task )
    in
    case maybeRoute of
        Nothing ->
            ( { model | currentPage = Blank }, Cmd.none )
        Just Route.Home ->
            transition HomeLoaded (Home.init)
        Just Route.Places ->
            transition PlacesLoaded (Places.init)
        Just (Route.Place id) ->
            transition PlaceLoaded (Place.init id)
        Just Route.Employees ->
            transition EmployeesLoaded (Employees.init)
        Just (Route.Employee id) ->
            transition EmployeeLoaded (Employee.init id)
        Just Route.Companies ->
            transition CompaniesLoaded (Companies.init)
        Just (Route.Company id) ->
            transition CompanyLoaded (Company.init id)

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    updatePage model.currentPage msg model

updatePage : Page -> Msg -> Model -> ( Model, Cmd Msg )
updatePage page msg model =
    let
        toPage toModel toMsg subUpdate subMsg subModel =
            let
                ( newModel, newCmd ) =
                    subUpdate subMsg subModel
            in
                ( { model | currentPage = (toModel newModel) }, Cmd.map toMsg newCmd )
    in
        case ( msg, page ) of
            ( SetRoute route, _ ) ->
                setRoute route model

-- TODO: Handle error part of Result to avoid silent fails
            ( HomeLoaded (Ok subModel), _ ) ->
                ( { model | currentPage = Home subModel }, Cmd.none )
            ( PlacesLoaded (Ok subModel), _ ) ->
                ( { model | currentPage = Places subModel }, Cmd.none )
            ( PlaceLoaded (Ok subModel), _ ) ->
                ( { model | currentPage = Place subModel }, Cmd.none )
            ( EmployeesLoaded (Ok subModel), _ ) ->
                ( { model | currentPage = Employees subModel }, Cmd.none )
            ( EmployeeLoaded (Ok subModel), _ ) ->
                ( { model | currentPage = Employee subModel }, Cmd.none )
            ( CompaniesLoaded (Ok subModel), _ ) ->
                ( { model | currentPage = Companies subModel }, Cmd.none )
            ( CompanyLoaded (Ok subModel), _ ) ->
                ( { model | currentPage = Company subModel }, Cmd.none )

            ( HomeMsg subMsg, Home subModel ) ->
                toPage Home HomeMsg Home.update subMsg subModel

            ( PlacesMsg subMsg, Places subModel ) ->
                toPage Places PlacesMsg Places.update subMsg subModel

            ( PlaceMsg subMsg, Place subModel ) ->
                toPage Place PlaceMsg Place.update subMsg subModel

            ( EmployeesMsg subMsg, Employees subModel ) ->
                toPage Employees EmployeesMsg Employees.update subMsg subModel

            ( EmployeeMsg subMsg, Employee subModel ) ->
                toPage Employee EmployeeMsg Employee.update subMsg subModel

            ( CompaniesMsg subMsg, Companies subModel ) ->
                toPage Companies CompaniesMsg Companies.update subMsg subModel

            ( CompanyMsg subMsg, Company subModel ) ->
                toPage Company CompanyMsg Company.update subMsg subModel

            ( _, _ ) ->
                ( model, Cmd.none )

main : Program Never Model Msg
main =
    Navigation.program (Route.fromLocation >> SetRoute)
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }