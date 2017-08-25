module Models exposing (..)

initialModel : Model
initialModel =
  { places = []
  , place = { id = "", postalCode = "", name = "" }
  , currentPage = HomePage
  , serverRequest = Nothing
  , message = ""
  }

type Page =
  HomePage
  | PlacesPage (List Place)
  | PlaceDetailsPage PlaceId Place
  | NotFoundPage

type Route
  = HomeRoute
  | PlacesRoute
  | PlaceDetailsRoute PlaceId
  | NotFoundRoute

type alias Model =
  { places : List Place
  , place: Place
  , currentPage : Page
  , serverRequest : Maybe String
  , message: String
  }

type alias PlaceId =
  String

type alias Place =
  { id: PlaceId
  , postalCode: String
  , name: String
  }
