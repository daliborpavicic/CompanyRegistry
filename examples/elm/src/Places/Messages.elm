module Places.Messages exposing (..)

import Http
import Places.Models exposing (Place)

type Msg
    =
      NoOp
    | SetPostalCode String
    | SetName String
    | SavePlace Place
    | FetchPlace String
    | SetPlaceId String
    | DeletePlace String
    | OnFetchPlace (Result Http.Error Place)
    | OnSavePlace (Result Http.Error Place)
    | OnDeletePlace (Result Http.Error Place)
    | RevertChanges