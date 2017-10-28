module Page.Home exposing (Model, Msg, init, update, view)

import Html exposing (..)
import Html.Attributes exposing (class, href)
import Task exposing (Task)
import Views.Table as Table

import Data.Place exposing (Place)

type alias Model =
    { welcomeMessage : String
    }

init : Task String Model
init =
    Task.succeed (Model "Welcome to Company Registry")

places =
    [ Place "21000" "21000" "Novi Sad"
    , Place "11000" "11000" "Beograd"
    , Place "24000" "24000" "Subotica"
    , Place "34000" "34000" "Kragujevac"
    , Place "22000" "22000" "Sremska Mitrovica"
    , Place "31000" "31000" "Užice"
    ]

config : Table.Config Place Msg
config =
    Table.config
        { columns =
            [ Table.stringColumn "Postal Code" .postalCode
            , Table.stringColumn "Name" .name
            ]
        }

view : Model -> Html Msg
view { welcomeMessage } =
    div []
        [ h1 [] [ text welcomeMessage ]
        , Table.view config places
        ]

type Msg
    = NoOp

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )