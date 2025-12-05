#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE users;
    CREATE DATABASE jobs;
    CREATE DATABASE notifications;
    CREATE DATABASE payments;
EOSQL
