module Page.Employee exposing (Model, Msg, init, update, view)

import Data.Employee exposing (Employee, EmployeeId, setId, setName, setJmbg, setSurname, setEmail)
import Http
import Html exposing (..)
import Html.Attributes exposing (href, class, classList, type_, placeholder, value, disabled)
import Html.Events exposing (onInput, onClick, onSubmit)
import Request.Employee
import Route
import Task exposing (Task)
import Views.Form as Form
import Views.Button as Button

type alias Model =
    { sourceEmployee : Employee
    , editingEmployee : Employee
    }

isEdit : Model -> Bool
isEdit model =
    not <| String.isEmpty model.editingEmployee.id

isAdd : Model -> Bool
isAdd model =
    not <| (isEdit model)

populateModel : Employee -> Model
populateModel employeee =
    Model employeee employeee

init : EmployeeId -> Task Http.Error Model
init id =
    if id == "new" then
        Task.succeed (populateModel (Employee "" "" "" "" ""))
    else
        let
            loadEmployee =
                Request.Employee.fetchEmployeeById id
                |> Http.toTask
        in
            Task.map populateModel loadEmployee

view : Model -> Html Msg
view model =
    employeeForm model

employeeForm : Model -> Html Msg
employeeForm model =
    let
        title =
            if isAdd model then
                "Add new employee"
            else
                "Edit employee " ++ model.sourceEmployee.name
        jmbg =
            model.editingEmployee.jmbg
        name =
            model.editingEmployee.name
        surname =
            model.editingEmployee.surname
        email =
            model.editingEmployee.email
    in
    div []
        [ h3 [] [ text title ]
        , hr [] []
        , Form.horizontalForm []
          [ Form.textInput "JMBG" [ value jmbg, onInput SetJmbg ] []
           , Form.textInput "Name" [ value name, onInput SetName ] []
           , Form.textInput "Surname" [ value surname, onInput SetSurname ] []
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
    | SetJmbg String
    | SetName String
    | SetSurname String
    | SetEmail String
    | Save
    | SaveCompleted (Result Http.Error Employee)
    | Delete
    | DeleteCompleted (Result Http.Error Employee)
    | RevertChanges
    | NavigateBack

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        SetJmbg newJmbg ->
            let
                newEmployee = setJmbg newJmbg model.editingEmployee
            in
                ( { model | editingEmployee = newEmployee }, Cmd.none )
        SetName newName ->
            let
                newEmployee = setName newName model.editingEmployee
            in
                ( { model | editingEmployee = newEmployee }, Cmd.none )
        SetSurname newSurname ->
            let
                newEmployee = setSurname newSurname model.editingEmployee
            in
                ( { model | editingEmployee = newEmployee }, Cmd.none )
        SetEmail newEmail ->
            let
                newEmployee = setEmail newEmail model.editingEmployee
            in
                ( { model | editingEmployee = newEmployee }, Cmd.none )

        Save ->
            let
                newModel =
                    if isEdit model then
                        model
                    else
                        let
                            newEmployee = setId model.editingEmployee.jmbg model.editingEmployee
                        in
                            { model | editingEmployee = newEmployee }
            in
            ( newModel
            , Cmd.batch
                [ Http.send SaveCompleted (Request.Employee.saveEmployee newModel.editingEmployee)
                , redirectToEmployees
                ]
             )

        SaveCompleted (Ok place) ->
            ( model, Cmd.none )

        SaveCompleted (Err error) ->
            ( model, Cmd.none )

        Delete ->
            ( model
            , Cmd.batch
                [ Http.send DeleteCompleted (Request.Employee.deleteEmployee model.editingEmployee.id)
                , redirectToEmployees
                ]
             )

        DeleteCompleted (Ok place) ->
            ( model, Cmd.none )

        DeleteCompleted (Err error) ->
            ( model, Cmd.none )

        NavigateBack ->
            ( model, redirectToEmployees )

        RevertChanges ->
            ( { model | editingEmployee = model.sourceEmployee }, Cmd.none )

redirectToEmployees : Cmd msg
redirectToEmployees =
    Route.modifyUrl Route.Employees