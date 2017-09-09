module Places.Models exposing (..)

type alias Place =
  { id:  String
  , postalCode : String
  , name : String
  }

type alias PlaceEditView =
  { editedPlace : Place
  , placeId: String
  , errorMessage: String
  , infoMessage: String
  , originalPlace : Place
  , places : List Place
  }

initalModel : PlaceEditView
initalModel =
    { editedPlace = Place "" "" ""
    , places = []
    , placeId = ""
    , errorMessage = ""
    , infoMessage = ""
    , originalPlace = Place "" "" ""
    }