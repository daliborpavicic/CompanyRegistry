module Views.Button exposing (BtnType(..), actionButton)

import Html exposing (..)
import Html.Attributes exposing (href, class, classList, type_, placeholder, value, disabled)

type BtnType = Default | Primary | Warning | Danger

actionButton : String -> BtnType -> List (Attribute msg) -> List (Html msg) -> Html msg
actionButton btnText btnType extraAttributes extraChildren =
    let
        btnClass = "btn " ++ (btnClassFromType btnType)
        attributes =
            [ type_ "button"
            , class btnClass
            ]
                ++ extraAttributes
        children =
            extraChildren ++ [ text btnText ]
    in
        button attributes children

btnClassFromType : BtnType -> String
btnClassFromType btnType =
    let
        class =
            case btnType of
                Default ->
                    "default"
                Primary ->
                    "primary"
                Warning ->
                    "warning"
                Danger ->
                    "danger"
    in
        "btn-" ++ class