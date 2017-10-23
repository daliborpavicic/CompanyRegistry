module Page.Places exposing (Model, Msg, init, update, view)

import Data.Place exposing (Place)
import Http
import Html exposing (..)
import Html.Attributes exposing (href, class, type_, placeholder, classList)
import Html.Events exposing (onInput, onClick)
import Request.Place
import Task exposing (Task)

type alias Model =
    { sort : Sort
    , postalCodeFilter : String
    , nameFilter : String
    , places: List Place
    }

type ColumnName = PostalCode | Name

type SortOrder = Asc | Desc

type Sort = None | Column ColumnName SortOrder

sortClassForColumn : Sort -> ColumnName -> String
sortClassForColumn sort forColumn =
    let
        sortClass =
            case sort of
                None ->
                    "fa-sort"

                Column columnName sortOrder ->
                    if columnName == forColumn then
                        if sortOrder == Asc then
                            "fa-sort-asc"
                        else
                            "fa-sort-desc"
                    else
                        "fa-sort"
    in
        "fa " ++ sortClass

toggleSort : SortOrder -> SortOrder
toggleSort order =
    case order of
        Asc -> Desc
        Desc -> Asc

updateSort : Sort -> ColumnName -> Sort
updateSort sort forColumn =
    case sort of
        None ->
            Column forColumn Asc

        Column columnName sortOrder ->
            Column forColumn <| toggleSort sortOrder

filterPlaces : Model -> List Place
filterPlaces model =
    List.filter
        (\place ->
            (String.isEmpty model.postalCodeFilter || String.contains model.postalCodeFilter place.postalCode)
            && (String.isEmpty model.nameFilter || String.contains model.nameFilter place.name)
        )
        model.places

sortPlaces : List Place -> Sort -> List Place
sortPlaces places sort =
    let
        sortByPostalCode places =
            List.sortBy .postalCode places
        sortByName places =
            List.sortBy .name places
    in
    case sort of
        None ->
            places

        Column columnName sortOrder ->
            case columnName of
                PostalCode ->
                    if sortOrder == Asc then
                        sortByPostalCode places
                    else
                        sortByPostalCode places
                            |> List.reverse
                Name ->
                    if sortOrder == Asc then
                        sortByName places
                    else
                        sortByName places
                            |> List.reverse

init : Task Http.Error Model
init =
    let
        loadPlaces =
            Request.Place.fetchPlaces
                |> Http.toTask
    in
        Task.map (Model None "" "") loadPlaces

type Msg
    = NoOp
    | SetPostalCodeFilter String
    | SetNameFilter String
    | ToggleSort Sort ColumnName

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
            sortPlaces filteredPlaces model.sort
    in
    table [ class "table table-hover table-bordered" ]
        [ thead []
          [ tr []
              [ th [ onClick (ToggleSort model.sort PostalCode) ]
                [ i [ class ("fa " ++ (sortClassForColumn model.sort PostalCode)) ] []
                , text " Postal Code"
                ]
              , th [ onClick (ToggleSort model.sort Name) ]
                [ i [ class ("fa " ++ (sortClassForColumn model.sort Name)) ] []
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

        ToggleSort currentSort forColumn ->
            let
                newSort =
                    updateSort currentSort forColumn
            in
                ( { model | sort = newSort }, Cmd.none )