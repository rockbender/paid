﻿# Create and run a new Docker Database

`docker run --name postgres -e POSTGRES_PASSWORD=abc123 -e POSTGRES_USER=sa -e POSTGRES_DB=paid-db -d -p 5432:5432 postgres`

# Run an existing Docker Container

`docker start postgres`

# Run server-net (API)

`dotnet run`

# Run web

`npm start`

# Create Data Migration

From Paid.Domain/ directory, run:
`dotnet ef --startup-project ../Paid.Api migrations add Temp -c PaidContext`

# Run Data Migration

From Paid.Domain/ directory, run:
`dotnet ef --startup-project ../Paid.Api database update`

# Create Migration Script (For Prod)
Ensure 
From Paid.Domain/ directory, run:
`dotnet ef --startup-project ../Paid.Api migrations script > migration_init_to_latest.sql`

# Create db Scaffold
Create DbContext, Entity Types based on the Db
`dotnet ef dbcontext scaffold "Host=localhost;Database=paid-db;Username=sa;Password=abc123" Npgsql.EntityFrameworkCore.PostgreSQL -o Temp-Entities`

# Create SQL Script from DbContext
`dotnet ef --startup-project ../Paid.Api dbcontext script -o create_db_script`

# Postgres - Set sequence start number

## 1. Create a Sequence
```
	CREATE SEQUENCE invoice_id_seq
ZDXcfe4u8
	  INCREMENT BY 1
	  NO MINVALUE
	  NO MAXVALUE
	  CACHE 1;
```

## 2. Associate it to a column
```
	ALTER TABLE invoice
	ALTER COLUMN id SET DEFAULT nextval('invoice_id_seq'::regclass);
```

## 3. Optionally, the sequence counter can be reset if required
```sql
  ALTER SEQUENCE invoice_id_seq RESTART WITH 1081;
```
