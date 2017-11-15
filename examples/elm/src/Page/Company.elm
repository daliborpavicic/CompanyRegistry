module Page.Company exposing (Model, Msg, init, update, view)

import Data.Company exposing (Company, CompanyId, setId, setName, setPib, setPhoneNumber, setEmail)
import Http
import Html exposing (..)
import Html.Attributes exposing (href, class, classList, type_, placeholder, value, disabled)
import Html.Events exposing (onInput, onClick, onSubmit)
import Request.Company
import Route
import Task exposing (Task)
import Views.Form as Form
import Views.Button as Button

type alias Model =
    { sourceCompany : Company
    , editingCompany : Company
    }

isEdit : Model -> Bool
isEdit model =
    not <| String.isEmpty model.editingCompany.id

isAdd : Model -> Bool
isAdd model =
    not <| (isEdit model)

populateModel : Company -> Model
populateModel company =
    Model company company

init : CompanyId -> Task Http.Error Model
init id =
    if id == "new" then
        Task.succeed (populateModel (Company "" "" "" "" ""))
    else
        let
            loadCompany =
                Request.Company.fetchCompanyById id
                |> Http.toTask
        in
            Task.map populateModel loadCompany

view : Model -> Html Msg
view model =
    placeForm model

placeForm : Model -> Html Msg
placeForm model =
    let
        title =
            if isAdd model then
                "Add new company"
            else
                "Edit company " ++ model.sourceCompany.name
        pib =
            model.editingCompany.pib
        name =
            model.editingCompany.name
        phoneNumber =
            model.editingCompany.phoneNumber
        email =
            model.editingCompany.email
    in
    div []
        [ h3 [] [ text title ]
        , hr [] []
        , Form.horizontalForm []
          [ Form.textInput "PIB" [ value pib, onInput SetPib ] []
           , Form.textInput "Name" [ value name, onInput SetName ] []
           , Form.textInput "Phone number" [ value phoneNumber, onInput SetPhoneNumber ] []
           , Form.textInput "Email" [ value email, onInput SetEmail ] []
           , div [ class "col-sm-offset-2" ]
                [ Button.actionButton
                    "Save" Button.Primary [ onClick Save ] []
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
    | SetPib String
    | SetName String
    | SetPhoneNumber String
    | SetEmail String
    | Save
    | SaveCompleted (Result Http.Error Company)
    | Delete
    | DeleteCompleted (Result Http.Error Company)
    | RevertChanges
    | NavigateBack

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        SetPib newPib ->
            let
                newCompany = setPib newPib model.editingCompany
            in
                ( { model | editingCompany = newCompany }, Cmd.none )
        SetName newName ->
            let
                newCompany = setName newName model.editingCompany
            in
                ( { model | editingCompany = newCompany }, Cmd.none )
        SetPhoneNumber newPhoneNumber ->
            let
                newCompany = setPhoneNumber newPhoneNumber model.editingCompany
            in
                ( { model | editingCompany = newCompany }, Cmd.none )
        SetEmail newEmail ->
            let
                newCompany = setEmail newEmail model.editingCompany
            in
                ( { model | editingCompany = newCompany }, Cmd.none )

        Save ->
            let
                newModel =
                    if isEdit model then
                        model
                    else
                        let
                            newCompany = setId model.editingCompany.pib model.editingCompany
                        in
                            { model | editingCompany = newCompany }
            in
            ( newModel
            , Cmd.batch
                [ Http.send SaveCompleted (Request.Company.saveCompany newModel.editingCompany)
                , redirectToCompanies
                ]
             )

        SaveCompleted (Ok place) ->
            ( model, Cmd.none )

        SaveCompleted (Err error) ->
            ( model, Cmd.none )

        Delete ->
            ( model
            , Cmd.batch
                [ Http.send DeleteCompleted (Request.Company.deleteCompany model.editingCompany.id)
                , redirectToCompanies
                ]
             )

        DeleteCompleted (Ok place) ->
            ( model, Cmd.none )

        DeleteCompleted (Err error) ->
            ( model, Cmd.none )

        NavigateBack ->
            ( model, redirectToCompanies )

        RevertChanges ->
            ( { model | editingCompany = model.sourceCompany }, Cmd.none )

redirectToCompanies : Cmd msg
redirectToCompanies =
    Route.modifyUrl Route.Companies