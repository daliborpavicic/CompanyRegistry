module Page.Places exposing (Model, Msg, init, update, view)

import Data.Place exposing (Place)
import Http
import Html exposing (..)
import Html.Attributes exposing (href, class, type_, placeholder, classList)
import Html.Events exposing (onInput, onClick)
import Request.Place
import Task exposing (Task)

type alias Model =
    { postalCodeFilter : String
    , postalCodeSort : SortOrder
    , nameFilter : String
    , nameSort : SortOrder
    , places: List Place
    }

type SortOrder = Asc | Desc | None

sortClass : SortOrder -> Attribute msg
sortClass order =
    case order of
        Asc ->
            classList [ ("fa", True), ("fa-sort-asc", True) ]
        Desc ->
            classList [ ("fa", True), ("fa-sort-desc", True) ]
        None ->
            classList [ ("fa", True), ("fa-sort", True) ]

toggleSort : SortOrder -> SortOrder
toggleSort order =
    case order of
        Asc -> Desc
        Desc -> None
        None -> Asc

filterPlaces : Model -> List Place
filterPlaces model =
    List.filter
        (\place ->
            (String.isEmpty model.postalCodeFilter || String.contains model.postalCodeFilter place.postalCode)
            && (String.isEmpty model.nameFilter || String.contains model.nameFilter place.name)
        )
        model.places

sortPlaces : List Place -> Model -> List Place
sortPlaces places model =
    if model.postalCodeSort /= None then
        let
            sortedAsc =
                List.sortBy .postalCode places
        in
            if model.postalCodeSort == Asc then
                sortedAsc
            else
                List.reverse sortedAsc
    else if model.nameSort /= None then
        let
            sortedAsc =
                List.sortBy .name places
        in
            if model.nameSort == Asc then
                sortedAsc
            else
                List.reverse sortedAsc
    else
        places

init : Task Http.Error Model
init =
    let
        loadPlaces =
            Request.Place.fetchPlaces
                |> Http.toTask
    in
        Task.map (Model "" None "" None) loadPlaces

type Msg
    = NoOp
    | SetPostalCodeFilter String
    | SetNameFilter String
    | TogglePostalCodeSort
    | ToggleNameSort

view : Model -> Html Msg
view model =
    div []
        [ h3 [] [ text "Places list" ]
        , placesTable model
        , hr [] []
        , div [] [ a [ class "btn btn-primary", href "#places/new" ] [ text "Add new place" ] ]
        ]

placesTable : Model -> Html Msg
placesTable model =
    let
        filteredPlaces =
            filterPlaces model
        sortedPlaces =
            sortPlaces filteredPlaces model
    in
    table [ class "table table-hover table-bordered" ]
        [ thead []
          [ tr []
              [ th [ onClick TogglePostalCodeSort ]
                [ i [ sortClass model.postalCodeSort ] []
                , text " Postal Code"
                ]
              , th [ onClick ToggleNameSort ]
                [ i [ sortClass model.nameSort ] []
                , text " Name"
                ]
              ]
          , tr []
            [ th []
                [ input [ type_ "text", class "form-control", placeholder "Postal Code...", onInput SetPostalCodeFilter ] [] ]
            , th []
                [ input [ type_ "text", class "form-control", placeholder "Name...", onInput SetNameFilter ] [] ]
            ]
          ]
        , tbody [] (List.map placeRow sortedPlaces)
        ]

placeRow : Place -> Html Msg
placeRow place =
  tr []
    [ td [] [ a [ href ("#places/" ++ place.id) ] [ text place.postalCode ] ]
    , td [] [ text place.name ]
    ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        SetPostalCodeFilter value ->
            ( { model | postalCodeFilter = value }, Cmd.none )

        SetNameFilter value ->
            ( { model | nameFilter = value }, Cmd.none )

        TogglePostalCodeSort ->
            let
                newSort =
                    toggleSort model.postalCodeSort
            in
            ( { model | postalCodeSort = newSort, nameSort = None }, Cmd.none )

        ToggleNameSort ->
            let
                newSort =
                    toggleSort model.nameSort
            in
            ( { model | nameSort = newSort, postalCodeSort = None }, Cmd.none )