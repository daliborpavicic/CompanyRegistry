module Main exposing (main)

import Page.Home as Home
import Page.Places as Places
import Route exposing (Route)
import Task
import Http
import Html exposing (..)
import Navigation exposing (Location)

type Page
    = Blank
    | Home Home.Model
    | Places Places.Model

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
    case page of
        Blank ->
            Html.text "Blank Page!"
        Home subModel ->
            Home.view subModel
                |> Html.map HomeMsg
        Places subModel ->
            Places.view subModel
                |> Html.map PlacesMsg

type Msg
    = SetRoute (Maybe Route)
    | HomeLoaded (Result String Home.Model)
    | PlacesLoaded (Result Http.Error Places.Model)
    | HomeMsg Home.Msg
    | PlacesMsg Places.Msg

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
            ( HomeLoaded (Ok subModel), _ ) ->
                ( { model | currentPage = Home subModel }, Cmd.none )
            ( PlacesLoaded (Ok subModel), _ ) ->
                ( { model | currentPage = Places subModel }, Cmd.none )
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