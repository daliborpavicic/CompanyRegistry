module Places.Update exposing (..)

import Http
import Places.Messages exposing (Msg(..))
import Places.Models exposing (Place, PlaceEditView)
import Places.Commands exposing (..)

update : Msg -> PlaceEditView -> ( PlaceEditView, Cmd Msg )
update msg placeEditView =
  case msg of
    NoOp ->
      ( placeEditView, Cmd.none )

    SetPostalCode newPostalCode ->
      let
        place = setPostalCode placeEditView.editedPlace newPostalCode
      in
        ( { placeEditView | editedPlace = place }, Cmd.none )

    SetName newName ->
      let
        place = setName placeEditView.editedPlace newName
      in
        ( { placeEditView | editedPlace = place }, Cmd.none )

    SavePlace newPlace ->
      ( { placeEditView | places = newPlace :: placeEditView.places }, submitPlace newPlace )

    SetPlaceId placeIdToFetch ->
      ( { placeEditView | placeId = placeIdToFetch }, Cmd.none )

    FetchPlace placeIdToFetch ->
      ( placeEditView, fetchPlaceById placeIdToFetch )

    OnFetchPlace (Ok newPlace) ->
      ( { placeEditView | editedPlace = newPlace, originalPlace = newPlace, errorMessage = "" }, Cmd.none )

    OnFetchPlace (Err err) ->
      case err of
        Http.BadStatus response ->
          ( { placeEditView | errorMessage = (toString response.status.code) ++ " " ++  response.status.message }, Cmd.none )

        _ ->
          ( placeEditView, Cmd.none )

    OnSavePlace (Ok savedPlace) ->
      ( { placeEditView | infoMessage = "Successfully saved place " ++ savedPlace.name }, Cmd.none )

    OnSavePlace (Err _) ->
      ( placeEditView, Cmd.none )

    DeletePlace placeId ->
      ( placeEditView, deletePlaceById placeId )

    OnDeletePlace (Ok deletedPlace) ->
      ( { placeEditView | infoMessage = "Successfully deleted place " ++ deletedPlace.name }, Cmd.none )

    OnDeletePlace (Err _) ->
      ( placeEditView, Cmd.none )

    RevertChanges ->
      ( { placeEditView | editedPlace = placeEditView.originalPlace }, Cmd.none )