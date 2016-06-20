#!/usr/bin/env bash

# Wait until database is available
while ! nc -z postgres_db 5432; do sleep 3; done

npm start