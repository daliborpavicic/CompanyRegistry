import Html exposing (..)
import Html.Events exposing (onClick, onInput)
import Html.Attributes as Attr
import Dict
import FilterableList exposing (..)

main = Html.program
  { init = init
  , view = view
  , update = update
  , subscriptions = (\_ -> Sub.none)
  }

init : ( Model, Cmd Msg )
init = ( initialModel, Cmd.none )

-- MODEL

type alias Model =
    { fruitsModel : ListModel
    , vegetablesModel : ListModel
    }

fruits : List String
fruits =
    [ "avocado"
    , "banana"
    , "apple"
    , "pineapple"
    , "melon"
    ]

vegetables : List String
vegetables =
    [ "potato"
    , "tomato"
    , "carrot"
    , "cabbage"
    , "onion"
    ]

initialModel : Model
initialModel =
    Model "" ""

-- UPDATE


type Msg
    = SetFruitsFilter FilterSetter
    | SetVegetablesFilter FilterSetter

update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
  case action of
    SetFruitsFilter filterSetter ->
        let
            newModel =
                { model | fruitsModel = setFilter filterSetter model.fruitsModel }
        in
      ( newModel, Cmd.none )

    SetVegetablesFilter filterSetter ->
        let
            newModel =
                { model | vegetablesModel = setFilter filterSetter model.vegetablesModel }
        in
      ( newModel, Cmd.none )


-- VIEW

view : Model -> Html Msg
view model =
  div []
    [ table []
        [ thead []
            [ tr []
                [ th [] [ text "Fruits" ]
                , th [] [ text "Vegetables" ]
                ]
            ]
        , tbody []
            [ tr []
                [ td [] [ makeListView model.fruitsModel fruits SetFruitsFilter ]
                , td [] [ makeListView model.vegetablesModel vegetables SetVegetablesFilter ]
                ]
            ]
        ]
    ]

makeListView : ListModel -> List String -> (FilterSetter -> Msg) -> Html Msg
makeListView listModel data msg =
    let
        filterableListConfig =
            config
                { setFilterMsg = msg
                }
    in
        viewList filterableListConfig listModel data