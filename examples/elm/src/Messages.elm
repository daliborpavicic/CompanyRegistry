module Messages exposing (..)

import Places.Messages

type Msg
  = NoOp
  | PlacesMsg Places.Messages.Msg