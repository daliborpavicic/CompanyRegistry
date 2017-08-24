module Msgs exposing (..)

import Models exposing (Place)
import RemoteData exposing (WebData)

type Msg
  = OnFetchPlaces (WebData (List Place))