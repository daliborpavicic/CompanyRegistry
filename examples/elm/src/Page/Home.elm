module Page.Home exposing (Model, Msg, init, update, view)

import Html exposing (..)
import Html.Attributes exposing (class, href)
import Task exposing (Task)

type alias Model =
    { welcomeMessage : String
    }

init : Task String Model
init =
    Task.succeed (Model "Welcome to Company Registry")

view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text model.welcomeMessage ]
        ]

type Msg
    = NoOp

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )