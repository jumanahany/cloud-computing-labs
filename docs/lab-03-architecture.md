# Lab 3 — Cloud Issue Tracker Architecture

## 1. Application Goal

The Cloud Issue Tracker allows users to create technical issues, view all existing issues, and change an issue's status. The application uses a frontend, a REST API, and a data layer to separate the user interface, application rules, and data storage.

## 2. Functional Scope

The application supports three main operations:

- Create an issue.
- View all issues.
- Change an issue's status between Open and Resolved.

## 3. Request Flow

### Create Issue

The user fills in the issue form and submits it. The frontend sends a POST request to `/api/issues` with the issue details as JSON. The API validates the request and asks the data layer to save the issue. The API returns `201 Created` with the new issue, and the frontend displays it.

### View Issues

When the page loads, the frontend sends a GET request to `/api/issues`. The API retrieves the stored issues from the data layer and returns `200 OK` with a JSON array. The frontend displays the issues or a message if the list is empty.

### Change Issue Status

When the user changes an issue's status, the frontend sends a PATCH request to `/api/issues/{id}/status`. The API checks that the issue exists and that the new status is valid. The data layer updates the status, and the API returns `200 OK` with the updated issue.

## 4. Trust Boundaries

The browser is the user-controlled side. Users can change form inputs and HTTP requests, so all incoming requests must be treated as untrusted.

The REST API and data layer are application-controlled. The API must validate every request before saving or updating data. The browser must never access the data layer directly. The API should return consistent error messages without exposing internal errors or stack traces.

Issue text must be displayed as plain text rather than interpreted as HTML.
