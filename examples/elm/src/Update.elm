module Update exposing (..)

import Navigation exposing (Location)
import Msgs exposing (Msg(..))
import Models exposing (Model, Route(..), Page(..))
import Commands exposing (fetchPlaces, fetchPlace)
import Routing exposing (parseLocation, modifyUrl, isEqual)

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Msgs.OnFetchPlaces (Ok places) ->
          ( { model
              | currentPage = PlacesPage places
              , places = places
              , message = ""
            }
          , Routing.newUrl <| PlacesPage places
          )

        Msgs.OnFetchPlaces (Err err) ->
          ( { model | places = [], message = (toString err) }, Cmd.none )

        Msgs.OnFetchPlace (Ok place) ->
          ( { model
              | currentPage = PlaceDetailsPage place.id place
              , place = place
              , message = ""
            }
          , Routing.newUrl <| PlaceDetailsPage place.id place
          )

        Msgs.OnFetchPlace (Err err) ->
          ( { model | place = { id = "", postalCode = "", name = ""  }, message = (toString err) }, Cmd.none )

        Msgs.OnLocationChange newLocation ->
          urlUpdate newLocation model

urlUpdate : Location -> Model -> ( Model, Cmd Msg )
urlUpdate newLocation model =
  let
    newRoute =
      Routing.parseLocation newLocation
    isEqualToCurrentPage =
      isEqual newRoute model.currentPage
  in
    if isEqualToCurrentPage then
      ( model, Cmd.none )
    else
      case newRoute of
        NotFoundRoute ->
          ( { model | message = "invalid URL: " ++ newLocation.hash }
            , Routing.modifyUrl model.currentPage
          )

        HomeRoute ->
          ( { model | currentPage = HomePage }
          , Cmd.none
          )

        PlacesRoute ->
          ( { model
            | serverRequest = Just "places"
            , message = "Loading places..."
            }
          , Cmd.batch
              [ fetchPlaces
              , Routing.modifyUrl model.currentPage
              ]
          )

        PlaceDetailsRoute id ->
          ( { model
            | serverRequest = Just id
            , message = "Loading place : " ++ id
            }
          , Cmd.batch
              [ fetchPlace id
              , Routing.modifyUrl model.currentPage
              ]
          )