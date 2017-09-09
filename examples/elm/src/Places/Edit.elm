module Places.Edit exposing (..)

import Html exposing (Html, text, div, button, input, table, thead, tbody, tr, th, td, br, p, form, label, i, h3, hr)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Places.Messages exposing (Msg(..))
import Places.Models exposing (Place, PlaceEditView)
import Places.List exposing (placesList)

view : PlaceEditView -> Html Msg
view model =
  div []
    [ fetchPlaceForm model
    , h3 [] [ text "Edit place" ]
    , hr [] []
    , Html.form [ class "form-horizontal" ]
      [ div [ class "form-group" ]
        [ label [ class "control-label col-sm-2" ] [ text "Postal Code" ]
        , div [ class "col-sm-6 col-md-4" ]
            [ input
              [ type_ "text"
              , class "form-control"
              , placeholder "Postal Code"
              , value model.editedPlace.postalCode
              , onInput SetPostalCode
              ] []
            ]
        ]
      , div [ class "form-group" ]
        [ label [ class "control-label col-sm-2" ] [ text "Name" ]
        , div [ class "col-sm-6 col-md-4" ]
            [ input
              [ type_ "text"
              , class "form-control"
              , placeholder "Name"
              , value model.editedPlace.name
              , onInput SetName
              ] []
            ]
        ]
       , div [ class "col-sm-offset-2" ]
          [ button [ class "btn btn-primary", type_ "button", onClick (SavePlace model.editedPlace) ] [ text "Save" ]
          , button [ class "btn btn-warning", type_ "button", onClick RevertChanges ] [ text "Revert" ]
          , button [ class "btn btn-danger", type_ "button", onClick (DeletePlace model.editedPlace.postalCode) ] [ text "Delete" ]
          , button
              [ class "btn btn-default"
              , type_ "button"
              ]
              [ i [ class "fa fa-chevron-left" ] []
              , text " Back"
              ]
          ]
      ]
    , placesList model.places
    ]

fetchPlaceForm : PlaceEditView -> Html Msg
fetchPlaceForm model =
  div []
    [ input [ type_ "text", placeholder "Enter postal code...", onInput SetPlaceId ] []
    , button [ onClick (FetchPlace model.placeId) ] [ text "Get place" ]
    , p [ style [ ("color", "red") ] ] [ text model.errorMessage ]
    , p [ style [ ("color", "blue") ] ] [ text model.infoMessage ]
    , br [] []
    ]

