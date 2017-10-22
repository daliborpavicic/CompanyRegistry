module Views.Form exposing (..)

import Html exposing (..)
import Html.Attributes exposing (href, class, classList, type_, placeholder, value, disabled)
import Html.Events exposing (onInput, onClick)

horizontalForm : List (Attribute msg) -> List (Html msg) -> Html msg
horizontalForm extraAttributes children =
    let
        attributes =
            [ class "form-horizontal" ] ++ extraAttributes
    in
        Html.form attributes children

textInput labelText attributes errors =
    let
        hasErrors = not <| List.isEmpty errors
        allAttributes =
            List.concat
                [ [ type_ "text" , class "form-control" , placeholder (labelText ++ "...") ]
                , attributes
                ]
    in
        formGroup hasErrors labelText
            [ input allAttributes []
            , fieldErrors errors
            ]

fieldErrors : List String -> Html msg
fieldErrors errors =
    errors
        |> List.map (\err -> div [ class "help-block" ] [ text err ])
        |> div []

formGroup hasErrors labelText children =
    div [ class "form-group", classList [ ("has-error", hasErrors) ] ]
        [ label [ class "control-label col-sm-2" ] [ text labelText ]
        , div [ class "col-sm-6 col-md-4" ] children
        ]