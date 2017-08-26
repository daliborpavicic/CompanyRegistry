module Msgs exposing (..)

import Http
import Models exposing (Place, Page)
import Navigation exposing (Location)

type Msg
  = OnFetchPlaces (Result Http.Error (List Place))
  | OnFetchPlace (Result Http.Error Place)
  | OnLocationChange Location
  | NavigateTo Page