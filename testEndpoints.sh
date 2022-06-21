#! /bin/bash

curl -H 'Content-Type: application/json' -d '{"password": "password", "username": "username"}' -X POST http://localhost:3000/auth/register
printf "\n"
RESPONSE=$(curl -H 'Content-Type: application/json' -d '{"password": "password", "username": "username"}' -X POST http://localhost:3000/auth/login)
TOKEN=$(jq -r ".token" <<< ${RESPONSE})
AUTHORIZATION="Authorization: bearer ${TOKEN}"
curl -H "${AUTHORIZATION}" http://localhost:3000/characters
printf "\n"
BODY='{"imagen":"imagen", "nombre":"nombre","edad":10,"peso":60,"historia":"historia","peliculasOSeries":"peliculasOSeries"}'
printf "\n"
RESPONSE=$(curl -X POST -H 'Content-Type: application/json' -d "${BODY}" -H "Authorization: bearer ${TOKEN}" http://localhost:3000/characters)
curl -H "${AUTHORIZATION}" http://localhost:3000/characters
PERSONAJE_ID=$(jq -r ".id" <<< ${RESPONSE})
printf "\n"
curl -H "${AUTHORIZATION}" -X DELETE "http://localhost:3000/characters/${PERSONAJE_ID}"
curl -H "${AUTHORIZATION}" http://localhost:3000/characters
printf "\n"
