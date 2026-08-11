-- Create required databases
SELECT 'CREATE DATABASE jobs' WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'jobs')\gexec
SELECT 'CREATE DATABASE payments' WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'payments')\gexec
SELECT 'CREATE DATABASE notifications' WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'notifications')\gexec
