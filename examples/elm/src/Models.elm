module Models exposing (..)

import RemoteData exposing (WebData)

type alias Model =
  { places: WebData (List Place)
  }

initialModel : Model
initialModel =
  { places = RemoteData.Loading
  }

type alias PlaceId =
  String

type alias Place =
  { id: PlaceId
  , postalCode: String
  , name: String
  }