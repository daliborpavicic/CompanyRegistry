module Request.Helpers exposing (apiUrl)

apiUrl : String -> String
apiUrl str =
    "https://api.mongolab.com/api/1/databases/angulardb/collections" ++ str ++ "?apiKey=ibGX1jtg9reXu0NcrrLwLuv5jpiUULnw"