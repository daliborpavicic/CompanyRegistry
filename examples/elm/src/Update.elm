module Update exposing (..)

import Models exposing (Model)
import Messages exposing (Msg(NoOp, PlacesMsg))
import Places.Update

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
      NoOp ->
        ( model, Cmd.none )

      PlacesMsg subMsg ->
        let
          ( newPlaceEditView, cmd ) =
              Places.Update.update subMsg model.placeEditView
          newModel =
              { model | placeEditView = newPlaceEditView }
        in
          ( newModel, Cmd.map PlacesMsg cmd )
