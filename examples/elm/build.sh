#!/usr/bin/env bash
rm -rf dist && mkdir dist
cp index.html styles.css dist/
elm-make src/Main.elm --output dist/Main.js

