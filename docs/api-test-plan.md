# Lab 3 — API Test Plan

The API was not implemented when these tests were originally defined in Lab 3. In Lab 4, the API was implemented and the tests below are being used to verify its behavior.

| Test ID | Request                                   | Expected Result                                                                                                 | Actual Result                                                                                           | Pass/Fail |
| ------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | --------- |
| T01     | GET `/api/issues`                         | 200; JSON array returned.                                                                                       | Existing issues returned successfully.                                                                  | Pass      |
| T02     | POST valid title, description, priority   | 201; complete created issue returned.                                                                           | Issue created with a server-generated ID, title, description, priority, status, and creation timestamp. | Pass      |
| T03     | POST missing title                        | 400; `VALIDATION_ERROR`.                                                                                        | Not tested yet.                                                                                         | Not run   |
| T04     | POST invalid priority = `Critical`        | 400; `VALIDATION_ERROR`.                                                                                        | HTTP 400; `VALIDATION_ERROR` returned with an invalid-priority message.                                 | Pass      |
| T05     | PATCH existing issue status = `Resolved`  | 200; returned status is `Resolved`.                                                                             | Updated issue returned with status `Resolved`.                                                          | Pass\*    |
| T06     | PATCH status = `Deleted`                  | 400; `VALIDATION_ERROR`.                                                                                        | Not tested yet.                                                                                         | Not run   |
| T07     | PATCH unknown issue ID                    | 404; `ISSUE_NOT_FOUND`.                                                                                         | HTTP 404; `ISSUE_NOT_FOUND` returned.                                                                   | Pass      |
| T08     | GET when no issues exist                  | 200; empty JSON array.                                                                                          | Not tested yet.                                                                                         | Not run   |
| T09     | Send unexpected extra server-owned fields | Server ignores/rejects according to the contract; client cannot choose authoritative `id`/`status`/`createdAt`. | Not tested yet.                                                                                         | Not run   |

**Notes:**

- Tests T01, T02, T04, T05, and T07 have been exercised.
- T05's response showed the updated status, but its HTTP status code was not explicitly captured in the PowerShell output.
- Tests T03, T06, T08, and T09 remain to be tested.
- Only mark a test as passed after observing its result.
