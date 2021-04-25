# PAID

A simple webapp to create and manage invoices for self employed.

# Setup

## Database

Setup mariadb database and optionally enable remote access by following this guide.
https://websiteforstudents.com/configure-remote-access-mysql-mariadb-databases/

# Mindmap

https://whimsical.com/paid-LyVK8kNf2bZ7mnpLnC22au

# Technical Specs

## Frontend

A react app with typescript.

**Color Palette**
https://coolors.co/ffcdb2-ffb4a2-e5989b-b5838d-6d6875

## Backend

A NodeJS project with ExpressJS.

Modules:

- cors
- dotenv
- express
- Joi
- TypeORM

## Database

- Mariadb is the database of choice
- The primary key in each table is `id` of type `INT` in the database. Preferrably it would be `BIGINT` but typeorm maps them to `string` which is less performant for filters vs. `number`.
