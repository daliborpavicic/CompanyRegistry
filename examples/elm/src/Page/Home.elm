module Page.Home exposing (Model, Msg, init, update, view)

import Html exposing (..)
import Html.Attributes as Attr exposing (class, href)
import Html.Events as E
import Task exposing (Task)
import Views.Table exposing (customizations)
import Table

import Data.Place exposing (Place)

type alias Model =
    { welcomeMessage : String
    , tableState : Table.State
    }

init : Task String Model
init =
    Task.succeed (Model "Welcome to Company Registry" (Table.initialSort "Postal Code"))

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
    Table.customConfig
        { toId = .id
        , toMsg = SetTableState
        , columns =
            [ Table.stringColumn "Postal Code" .postalCode
            , Table.stringColumn "Name" .name
            ]
        , customizations = customizations
        }

view : Model -> Html Msg
view { welcomeMessage, tableState } =
    div []
        [ h1 [] [ text welcomeMessage ]
        , Table.view config tableState places
        ]

type Msg
    = NoOp
    | SetTableState Table.State

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        SetTableState newState ->
            ( { model | tableState = newState }
            , Cmd.none
            )