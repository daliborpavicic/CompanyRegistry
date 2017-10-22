module Page.Place exposing (Model, Msg, init, update, view)

import Data.Place exposing (Place, PlaceId, setPostalCode, setName, setId)
import Http
import Html exposing (..)
import Html.Attributes exposing (href, class, classList, type_, placeholder, value, disabled)
import Html.Events exposing (onInput, onClick, onSubmit)
import Request.Place
import Route
import Task exposing (Task)
import Validate

type alias Model =
    { sourcePlace : Place
    , editingPlace : Place
    }

isEdit : Model -> Bool
isEdit model =
    not <| String.isEmpty model.editingPlace.id

isAdd : Model -> Bool
isAdd model =
    not <| (isEdit model)

populateModel : Place -> Model
populateModel place =
    Model place place

init : PlaceId -> Task Http.Error Model
init id =
    if id == "new" then
        Task.succeed (populateModel (Place "" "" ""))
    else
        let
            loadPlace =
                Request.Place.fetchPlaceById id
                |> Http.toTask
        in
            Task.map populateModel loadPlace

isShorterThan : error -> Int -> Validate.Validator error String
isShorterThan error maxLength =
    Validate.ifInvalid (\subject -> (String.length subject) >= maxLength) error

postalCodeValidators : List (Validate.Validator String String)
postalCodeValidators =
    [ Validate.ifBlank "Postal code is required"
    , Validate.ifNotInt "Postal code must be an integer."
    ]

nameValidators : List (Validate.Validator String String)
nameValidators =
    let
        maxLength = 20
    in
        [ Validate.ifBlank "Name is required"
        , isShorterThan ("Max length for name is " ++ (toString maxLength)) maxLength
        ]

view : Model -> Html Msg
view model =
    placeForm model

placeForm : Model -> Html Msg
placeForm model =
    let
        title =
            if isAdd model then
                "Add new place"
            else
                "Edit place " ++ model.sourcePlace.name
        hasPostalCodeErrors =
            not <| Validate.any postalCodeValidators model.editingPlace.postalCode
        postalCodeErrors =
            Validate.all postalCodeValidators model.editingPlace.postalCode
        hasNameErrors =
            not <| Validate.any nameValidators model.editingPlace.name
        nameErrors =
            Validate.all nameValidators model.editingPlace.name
    in
    div []
    [ h3 [] [ text title ]
    , hr [] []
    , Html.form [ class "form-horizontal", onSubmit Save ]
      [ div [ class "form-group", classList [ ("has-error", hasPostalCodeErrors) ] ]
        [ label [ class "control-label col-sm-2" ] [ text "Postal Code" ]
        , div [ class "col-sm-6 col-md-4" ]
            [ input
              [ type_ "text"
              , class "form-control"
              , placeholder "Postal Code"
              , value model.editingPlace.postalCode
              , onInput SetPostalCode
              ] []
              , fieldErrors postalCodeErrors
            ]
        ]
      , div [ class "form-group", classList [ ("has-error", hasNameErrors) ] ]
        [ label [ class "control-label col-sm-2" ] [ text "Name" ]
        , div [ class "col-sm-6 col-md-4" ]
            [ input
              [ type_ "text"
              , class "form-control"
              , placeholder "Name"
              , value model.editingPlace.name
              , onInput SetName
              ] []
              , fieldErrors nameErrors
            ]
        ]
       , div [ class "col-sm-offset-2" ]
            [ button [ class "btn btn-primary", disabled (hasPostalCodeErrors || hasNameErrors) ] [ text "Save" ]
            , button
              [ class "btn btn-default"
              , type_ "button"
              , onClick NavigateBack
              ]
              [ i [ class "fa fa-chevron-left" ] []
              , text " Back"
              ]
          , button [ class "btn btn-warning", type_ "button", disabled (isAdd model),  onClick RevertChanges ] [ text "Revert" ]
          , button [ class "btn btn-danger", type_ "button", disabled (isAdd model), onClick Delete ] [ text "Delete" ]
        ]
      ]
    ]

fieldErrors errors =
    div []
        (List.map (\err -> div [ class "help-block" ] [ text err ]) errors)

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
            let
                newModel =
                    if isEdit model then
                        model
                    else
                        let
                            newPlace = setId model.editingPlace.postalCode model.editingPlace
                        in
                            { model | editingPlace = newPlace }
            in
            ( newModel
            , Cmd.batch
                [ Http.send SaveCompleted (Request.Place.savePlace newModel.editingPlace)
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