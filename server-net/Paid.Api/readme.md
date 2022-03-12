# Create and run a new Docker Database

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

From Paid.Domain/ directory, run:
`dotnet ef --startup-project ../Paid.Api migrations script > migration_init_to_latest.sql`

# Create db Scaffold

`dotnet ef dbcontext scaffold "Host=localhost;Database=paid-db;Username=sa;Password=abc123" Npgsql.EntityFrameworkCore.PostgreSQL -o Temp-Entities`

# Postgres - Set sequence start number

```sql
  ALTER SEQUENCE invoice_id_seq RESTART WITH 1001;
```
