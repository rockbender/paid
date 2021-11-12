# Run Docker Database

`docker run --name postgres -e POSTGRES_PASSWORD=abc123 -e POSTGRES_USER=sa -e POSTGRES_DB=paid-db -d -p 5432:5432 postgres`

# Create Data Migration

From Paid.Domain/ directory, run:
`dotnet ef --startup-project ../Paid.api.aspnet migrations add Temp -c PaidContext`

# Run Data Migration

From Paid.Domain/ directory, run:
`dotnet ef --startup-project ../Paid.api.aspnet database update`

# Create Migration Script (For Prod)

From Paid.Domain/ directory, run:
`dotnet ef --startup-project ../Paid.api.aspnet migrations script > migration_init_to_latest.sql`

# Create db Scaffold

`dotnet ef dbcontext scaffold "Host=localhost;Database=paid-db;Username=sa;Password=abc123" Npgsql.EntityFrameworkCore.PostgreSQL -o Temp-Entities`