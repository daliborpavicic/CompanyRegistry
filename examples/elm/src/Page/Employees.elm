module Page.Employees exposing (Model, Msg, init, update, view)

import Data.Employee exposing (Employee)
import Http
import Html exposing (..)
import Html.Attributes exposing (href, class, type_, placeholder, classList)
import Request.Employee
import Task exposing (Task)

type alias Model =
    { employees : List Employee
    }

init : Task Http.Error Model
init =
    let
        loadEmployees =
            Request.Employee.fetchEmployees
                |> Http.toTask
    in
        Task.map Model loadEmployees

type Msg
    = NoOp

view : Model -> Html Msg
view model =
    table [ class "table table-hover table-bordered" ]
        [ thead []
          [ tr []
              [ th []
                [ i [] []
                , text " JMBG"
                ]
              , th []
                [ i [] []
                , text " Name"
                ]
              ]
          , tr []
            [ th []
                [ input [ type_ "text", class "form-control", placeholder "JMBG..." ] [] ]
            , th []
                [ input [ type_ "text", class "form-control", placeholder "Name..." ] [] ]
            ]
          ]
        , tbody [] (List.map employeeRow model.employees)
        ]

employeeRow : Employee -> Html Msg
employeeRow employee =
  tr []
    [ td [] [ a [ href ("#employees/" ++ employee.id) ] [ text employee.jmbg ] ]
    , td [] [ text employee.name ]
    ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )