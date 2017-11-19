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
import Util exposing (isShorterThan)
import Views.Form as Form
import Views.Button as Button

type alias Model =
    { isValidationStarted : Bool
    , sourcePlace : Place
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
    Model False place place

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
        { isValidationStarted } = model
        title =
            if isAdd model then
                "Add new place"
            else
                "Edit place " ++ model.sourcePlace.name
        postalCode =
            model.editingPlace.postalCode
        name =
            model.editingPlace.name
        hasPostalCodeErrors =
            isValidationStarted && (not <| Validate.any postalCodeValidators postalCode)
        postalCodeErrors =
            if isValidationStarted then Validate.all postalCodeValidators postalCode else []
        hasNameErrors =
            isValidationStarted && (not <| Validate.any nameValidators name)
        nameErrors =
            if isValidationStarted then  Validate.all nameValidators name else []
    in
    div []
        [ h3 [] [ text title ]
        , hr [] []
        , Form.horizontalForm []
          [ Form.textInput "Postal Code" [ value postalCode, onInput SetPostalCode ] postalCodeErrors
           , Form.textInput "Name" [ value name, onInput SetName ] nameErrors
           , div [ class "col-sm-offset-2" ]
                [ Button.actionButton
                    "Save" Button.Primary [ disabled (isValidationStarted && (hasPostalCodeErrors || hasNameErrors)), onClick Save ] []
                , Button.actionButton
                    " Back" Button.Default [ onClick NavigateBack ] [ i [ class "fa fa-chevron-left" ] [] ]
                , Button.actionButton
                    "Revert" Button.Warning [ disabled (isAdd model),  onClick RevertChanges ] []
                , Button.actionButton
                    "Delete" Button.Danger [ disabled (isAdd model), onClick Delete ] []
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
            let
                { isValidationStarted } = model
                newModel =
                    if isEdit model then
                        model
                    else
                        let
                            newPlace = setId model.editingPlace.postalCode model.editingPlace
                        in
                            { model | editingPlace = newPlace }
            in
                if isValidationStarted then
                    ( newModel
                    , Cmd.batch
                        [ Http.send SaveCompleted (Request.Place.savePlace newModel.editingPlace)
                        , redirectToPlaces
                        ]
                     )
                 else
                    ( { model | isValidationStarted = True }, Cmd.none )

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