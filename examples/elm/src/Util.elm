module Util exposing (..)

import Validate

isShorterThan : error -> Int -> Validate.Validator error String
isShorterThan error maxLength =
    Validate.ifInvalid (\subject -> (String.length subject) >= maxLength) error
