# About

Paid web app, to manage timesheet and invoices for consultants.

## Features
- Home page with a list of invoices, and CRUD
- Timesheet page to view list of timesheets, and CRUD
- Settings Page to manage projects and rates, and schedule
- Preview Invoice in browser
- Download Invoice as PDF
- Create invoice right in the beautiful template
- Toast Notification

## Release Notes v.0.3
- [ ] Add Create Invoice Validation in UI
- [ ] Add Create Invoice validation in API

## Release Notes v.0.2 (with-api)
- [ ] Home page loads invoices from db
- [ ] Created invoice saves to db
- [ ] Can add a project
- [ ] Can view list of projects
- [ ] Can select a project when creating an invoice with dropdowns
- [ ] Time range on invoice creation is optional
- [ ] Hide infobar in all create/detail page

## Release Notes v.0.1 (no-api)
- [x] Home page load in-memory invoices in tabular format
- [x] Can create a new invoice and add to in-memory data
- [x] On create Invoice, get invoice total from work items
- [x] Can view details of each invoice
- [ ] Can download a rudimentary version of an invoice

## Components
app
  header
  menubar
    info-bar
    filter-menu
  invoice-list / invoice-detail
  timesheet-list / timesheet-detail
  settings
  footer

## Router
```json
{
  "/": "/home",
  "/invoices": "invoices",
  "/invoices/:id": "invoice-detail",
  "/timesheeta": "timesheets",
  "/settings": "settings",
}
```