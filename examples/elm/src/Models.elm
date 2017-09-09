module Models exposing (..)

import Messages exposing (..)
import Places.Models exposing (Place, PlaceEditView, initalModel)

type alias Model =
  { placeEditView : PlaceEditView
  }

initial : Model
initial =
  { placeEditView = initalModel
  }

init : ( Model, Cmd Msg )
init =
    ( initial, Cmd.none )