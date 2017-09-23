module Page.Place exposing (Model, Msg, init, update, view)

import Data.Place exposing (Place, PlaceId, setPostalCode, setName)
import Http
import Html exposing (..)
import Html.Attributes exposing (href, class, type_, placeholder, value)
import Html.Events exposing (onInput, onClick, onSubmit)
import Request.Place
import Route
import Task exposing (Task)

type alias Model =
    { sourcePlace : Place
    , editingPlace : Place
    }

populateModel : Place -> Model
populateModel place =
    Model place place

init : PlaceId -> Task Http.Error Model
init id =
    let
        loadPlace =
            Request.Place.fetchPlaceById id
            |> Http.toTask
    in
        Task.map populateModel loadPlace

view : Model -> Html Msg
view model =
    placeForm model

placeForm : Model -> Html Msg
placeForm model =
    div []
    [ h3 [] [ text <| "Edit place " ++ model.sourcePlace.name ]
    , hr [] []
    , Html.form [ class "form-horizontal", onSubmit Save ]
      [ div [ class "form-group" ]
        [ label [ class "control-label col-sm-2" ] [ text "Postal Code" ]
        , div [ class "col-sm-6 col-md-4" ]
            [ input
              [ type_ "text"
              , class "form-control"
              , placeholder "Postal Code"
              , value model.editingPlace.postalCode
              , onInput SetPostalCode
              ] []
            ]
        ]
      , div [ class "form-group" ]
        [ label [ class "control-label col-sm-2" ] [ text "Name" ]
        , div [ class "col-sm-6 col-md-4" ]
            [ input
              [ type_ "text"
              , class "form-control"
              , placeholder "Name"
              , value model.editingPlace.name
              , onInput SetName
              ] []
            ]
        ]
       , div [ class "col-sm-offset-2" ]
            [ button [ class "btn btn-primary" ] [ text "Save" ]
            , button
              [ class "btn btn-default"
              , type_ "button"
              , onClick NavigateBack
              ]
              [ i [ class "fa fa-chevron-left" ] []
              , text " Back"
              ]
          , button [ class "btn btn-warning", type_ "button", onClick RevertChanges ] [ text "Revert" ]
          , button [ class "btn btn-danger", type_ "button", onClick Delete ] [ text "Delete" ]
        ]
      ]
    ]

type Msg
    = NoOp
    | SetPostalCode String
    | SetName String
    | Save
    | SaveCompleted (Result Http.Error Place)
    | Delete
    | DeleteCompleted (Result Http.Error Place)
    | RevertChanges
    | NavigateBack

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        SetPostalCode newPostalCode ->
            let
                newPlace = setPostalCode newPostalCode model.editingPlace
            in
                ( { model | editingPlace = newPlace }, Cmd.none )
        SetName newName ->
            let
                newPlace = setName newName model.editingPlace
            in
                ( { model | editingPlace = newPlace }, Cmd.none )

        Save ->
            ( model
            , Cmd.batch
                [ Http.send SaveCompleted (Request.Place.savePlace model.editingPlace)
                , redirectToPlaces
                ]
             )

        SaveCompleted (Ok place) ->
            ( model, Cmd.none )

        SaveCompleted (Err error) ->
            ( model, Cmd.none )

        Delete ->
            ( model
            , Cmd.batch
                [ Http.send DeleteCompleted (Request.Place.deletePlace model.editingPlace.id)
                , redirectToPlaces
                ]
             )

        DeleteCompleted (Ok place) ->
            ( model, Cmd.none )

        DeleteCompleted (Err error) ->
            ( model, Cmd.none )

        NavigateBack ->
            ( model, redirectToPlaces )

        RevertChanges ->
            ( { model | editingPlace = model.sourcePlace }, Cmd.none )

redirectToPlaces : Cmd msg
redirectToPlaces =
    Route.modifyUrl Route.Places